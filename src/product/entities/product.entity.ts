import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar' })
  gsku: string;

  @Column({ type: 'varchar' })
  quantity: string;

  @Column({ type: 'varchar' })
  package_type: string;

  @Column({ type: 'varchar' })
  volume: string;

  @Column({ type: 'varchar' })
  producer: string;

  @Column({ type: 'varchar' })
  sku: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  type: string;
}
