import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductCreateDto } from './dto/product.create.dto';
import { toProductDto } from '../shared/utils';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  async getAllProducts(): Promise<ProductDto[]> {
    const products = await this.productRepository.find();
    return products.map((product) => toProductDto(product));
  }

  async getOneProduct(id: string): Promise<ProductDto> {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new HttpException(`Product doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    return toProductDto(product);
  }

  async createProduct(productCreateDto: ProductCreateDto): Promise<ProductDto> {
    const {
      description,
      gsku,
      quantity,
      package_type,
      volume,
      producer,
      sku,
      title,
      type,
    } = productCreateDto;

    const product: Product = await this.productRepository.create({
      description,
      gsku,
      quantity,
      package_type,
      volume,
      producer,
      sku,
      title,
      type,
    });

    await this.productRepository.save(product);

    return toProductDto(product);
  }

  async updateProduct(id: string, productDto: ProductDto): Promise<ProductDto> {
    const {
      description,
      gsku,
      quantity,
      package_type,
      volume,
      producer,
      sku,
      title,
      type,
    } = productDto;

    let product: Product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new HttpException(`Product doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    product = {
      id,
      description,
      gsku,
      quantity,
      package_type,
      volume,
      producer,
      sku,
      title,
      type,
    };

    await this.productRepository.update({ id }, product);

    return toProductDto(product);
  }

  async deleteProduct(id: string): Promise<ProductDto> {
    const product: Product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new HttpException(`Product doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    await this.productRepository.delete({ id });

    return toProductDto(product);
  }
}
