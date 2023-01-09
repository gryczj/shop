import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Element } from '../../basket/dto/element.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  pwd: string;

  @Column()
  name: string;

  @Column({ default: false })
  basketOwner: boolean;

  @OneToMany(() => Element, (element) => element.user)
  basket?: Element[];
}
