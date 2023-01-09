import {
  Check,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Element } from '../../basket/dto/element.entity';

@Entity()
@Check('"price" > 0')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  public imageURL: string;

  @OneToMany(() => Element, (el) => el.product)
  basket: Element[];
}
