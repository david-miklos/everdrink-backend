import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { Module } from '@nestjs/common';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [CategoryModule,TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
