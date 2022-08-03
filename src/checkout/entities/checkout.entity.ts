import { Address } from '../../address/entities/address.entity';
import { Order } from '../../order/entities/order.entity';
import { User } from '../../user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Shipping } from '../shipping.enum';

@Entity('checkout')
export class Checkout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: Shipping,
  })
  shipping: Shipping;

  @OneToMany(() => Order, (order) => order.checkout)
  orders: Order[];

  @ManyToOne(() => User, (user) => user.checkouts, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Address, (address) => address.checkouts)
  address: Address;
}
