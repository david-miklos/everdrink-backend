import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { Module } from '@nestjs/common';
import { AuthModule } from "../auth/auth.module";
import { PassportModule } from "@nestjs/passport";
import { BootstrapModule } from "../bootstrap/bootstrap.module";
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [CategoryModule,TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
