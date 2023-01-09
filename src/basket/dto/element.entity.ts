import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../product/dto/product.entity';
import { User } from '../../user/dto/user.entity';

@Entity()
export class Element {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (p) => p.basket)
  product: Product;

  @ManyToOne(() => User, (u) => u.basket)
  user: User;

  @Column()
  price: number;

  @Column()
  quantity: number;
}
