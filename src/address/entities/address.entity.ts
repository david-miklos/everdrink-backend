import { Checkout } from 'src/checkout/entities/checkout.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar' })
  country: string;

  @Column({ type: 'varchar' })
  region: string;

  @Column({ type: 'varchar' })
  zip: string;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  street: string;

  @Column({ type: 'varchar' })
  street_number: string;

  @ManyToOne( () => User, user => user.addresses )
  user: User;

  @OneToMany(() => Checkout, (checkout) => checkout.address)
  checkouts: Checkout[];
}
