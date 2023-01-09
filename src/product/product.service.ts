import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './dto/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async addProduct(
    name: string,
    price: number,
    imageURL: string,
  ): Promise<void> {
    const createdProduct = this.productRepository.create({
      name,
      price,
      imageURL,
    });
    try {
      await this.productRepository.save(createdProduct);
    } catch (e) {
      throw Error(e);
    }
  }

  async updateProduct(
    id: number,
    updatedFields: { [key: string]: number | string },
  ): Promise<void> {
    try {
      await this.productRepository.update(id, {
        ...updatedFields,
      });
    } catch (e) {
      throw Error(e);
    }
  }

  async getProduct(productId: number): Promise<Product> {
    try {
      const found = await this.productRepository.findOneBy({ id: productId });
      if (!found) {
        throw new NotFoundException('Product not found.');
      }
      return found;
    } catch (e) {
      throw Error(e);
    }
  }

  async deleteProduct(productId: number): Promise<void> {
    try {
      const found = await this.productRepository.findOneBy({ id: productId });
      if (!found) {
        throw new NotFoundException('Product can not be deleted.');
      }
      await this.productRepository.delete(productId);
    } catch (e) {
      throw Error(e);
    }
  }

  async getProducts(): Promise<Product[]> {
    return await this.productRepository.createQueryBuilder('product').getMany();
  }
}
