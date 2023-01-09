import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './dto/product.entity';
import { AddProductDto } from './dto/addProductDto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('add')
  async addProduct(
    @Body() addProductDto: AddProductDto,
  ): Promise<{ code: number; response: string }> {
    const { name, price, imageURL } = addProductDto;
    try {
      await this.productService.addProduct(name, price, imageURL);
    } catch (e) {
      throw Error(e);
    }
    return {
      code: 200,
      response: 'Product added.',
    };
  }

  @Delete(':id')
  async deleteProduct(
    @Param('id') id: number,
  ): Promise<{ code: number; response: string }> {
    try {
      await this.productService.deleteProduct(id);
    } catch (e) {
      throw Error(e);
    }
    return {
      code: 200,
      response: 'Product deleted.',
    };
  }

  @Get(':id')
  async getProduct(@Param('id') id: number): Promise<Product> {
    try {
      return await this.productService.getProduct(id);
    } catch (e) {
      throw Error(e);
    }
  }

  @Get('')
  async getProducts(): Promise<Product[]> {
    return await this.productService.getProducts();
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() fieldsToUpdate: { [key: string]: number | string },
  ): Promise<{ code: number; response: string }> {
    try {
      await this.productService.updateProduct(id, fieldsToUpdate);
    } catch (e) {
      throw Error(e);
    }
    return {
      code: 200,
      response: 'Product updated.',
    };
  }
}
