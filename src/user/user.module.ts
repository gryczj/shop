import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './dto/user.entity';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
