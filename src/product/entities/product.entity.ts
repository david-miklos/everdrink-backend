import { Category } from 'src/category/entities/category.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  brand: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'varchar' })
  alcohol_content: string;

  @Column({ type: 'varchar' })
  packaging: string;

  @Column({ type: 'varchar' })
  volume: string;

  @Column({ type: 'int' })
  net_price: number;

  @Column({ type: 'int' })
  vat: number;
  
  @Column({ type: 'int' })
  gross_price: number;

  @Column({ type: 'int' })
  wrappage_net_price: number;

  @Column({ type: 'int' })
  wrappage_gross_price: number;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne( () => Category, category => category.products )
  category: Category;
}
