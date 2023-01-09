import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BasketModule } from './basket/basket.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/dto/product.entity';
import { User } from './user/dto/user.entity';
import { Element } from './basket/dto/element.entity';
import { ConfigModule } from '@nestjs/config';
import { UserPermissionsMiddleware } from './auth/middlewares/user-permissions.middleware';
import { BasketController } from './basket/basket.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Product, Element],
      synchronize: Boolean(process.env.SYNC_DB),
    }),
    ProductModule,
    AuthModule,
    UserModule,
    BasketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserPermissionsMiddleware)
      .exclude(
        { path: 'basket', method: RequestMethod.GET },
        { path: 'basket', method: RequestMethod.POST },
      )
      .forRoutes(BasketController);
  }
}
