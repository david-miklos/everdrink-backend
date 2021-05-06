import { Address } from 'src/address/entities/address.entity';
import { Order } from 'src/order/entities/order.entity';
import { User } from 'src/user/entities/user.entity';
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
  
  @ManyToOne(() => User, (user) => user.checkouts)
  user: User;

  @ManyToOne(() => Address, (address) => address.checkouts)
  address: Address;
}
