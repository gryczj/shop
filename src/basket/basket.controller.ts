import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { BasketService } from './basket.service';
import { Element } from './dto/element.entity';
import { Product } from '../product/dto/product.entity';
import { basketElementDto } from './dto/basketElementDto';

@UseGuards(JwtAuthGuard)
@Controller('basket')
export class BasketController {
  constructor(private basketService: BasketService) {}

  @Post(':userId/addProduct')
  async addProductToBasket(
    @Param('userId') userId: number,
    @Body() basketElement: basketElementDto,
  ): Promise<{ code: number; response: string }> {
    try {
      await this.basketService.addProductToBasket(userId, basketElement);
    } catch (e) {
      throw Error(e);
    }
    return {
      code: 200,
      response: 'Product added to basket.',
    };
  }

  @Delete(':userId/removeProduct/:productId')
  async removeProductFromBasket(
    @Param('userId') userId: number,
    @Param('productId') productId: number,
  ): Promise<{ code: number; response: string }> {
    try {
      await this.basketService.removeProductFromBasket(userId, productId);
    } catch (e) {
      throw Error(e);
    }
    return {
      code: 200,
      response: 'Product removed from the basket.',
    };
  }

  @Get(':userId/products')
  async getProductsSummaryByUser(
    @Param('userId') userId: number,
  ): Promise<Product[]> {
    return this.basketService.getProductsSummaryByUser(userId);
  }

  @Get(':userId/summary')
  async getBasketSummaryByUser(
    @Param('userId') userId: number,
  ): Promise<Element[]> {
    return await this.basketService.getBasketSummaryByUser(userId);
  }
}
