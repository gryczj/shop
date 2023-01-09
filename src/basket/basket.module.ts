import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Element } from './dto/element.entity';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';
import { Product } from '../product/dto/product.entity';
import { User } from '../user/dto/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Element, Product, User]),
    UserModule,
    ProductModule,
  ],
  providers: [BasketService],
  controllers: [BasketController],
})
export class BasketModule {}
