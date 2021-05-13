import { Product } from 'src/product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  display_name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  order: number;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
