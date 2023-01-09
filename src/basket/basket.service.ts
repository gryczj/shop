import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Element } from './dto/element.entity';
import { Repository } from 'typeorm';
import { Product } from '../product/dto/product.entity';
import { User } from '../user/dto/user.entity';
import { basketElementDto } from './dto/basketElementDto';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Element)
    private elementRepository: Repository<Element>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async addProductToBasket(
    userId: number,
    { productId, quantity }: basketElementDto,
  ): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    const product = await this.productRepository.findOneBy({ id: productId });
    if (!product || !user) {
      throw new NotFoundException('Product can not be added.');
    }
    const price = product.price * quantity;
    const createdElement = this.elementRepository.create({
      user,
      product,
      price,
      quantity,
    });
    try {
      await this.elementRepository.save(createdElement);
    } catch (e) {
      throw Error(e);
    }
  }

  async removeProductFromBasket(
    userId: number,
    productId: number,
  ): Promise<void> {
    try {
      const element = await this.elementRepository
        .createQueryBuilder('element')
        .innerJoin('element.product', 'product', 'element.user = :userId', {
          userId,
        })
        .where('element.product = :productId', { productId })
        .getOne();
      if (!element) {
        throw new NotFoundException(
          'Product can not be deleted from the basket.',
        );
      }
      await this.elementRepository.delete(element.id);
    } catch (e) {
      throw Error(e);
    }
  }

  async getProductsSummaryByUser(userId: number): Promise<Product[]> {
    return await this.productRepository
      .createQueryBuilder('product')
      .innerJoin('product.basket', 'element')
      .where('element.user = :userId', { userId })
      .getMany();
  }

  async getBasketSummaryByUser(userId: number): Promise<Element[]> {
    return await this.elementRepository
      .createQueryBuilder('element')
      .innerJoinAndSelect('element.product', 'product')
      .where('element.user = :userId', { userId })
      .getMany();
  }
}
