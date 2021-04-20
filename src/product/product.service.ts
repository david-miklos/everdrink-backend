import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductCreateDto } from './dto/product.create.dto';
import { toProductDto } from '../shared/utils';
import { ProductDto } from './dto/product.dto';
import { Category } from 'src/category/entities/category.entity';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private categoryService: CategoryService,
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

  async createProduct(
    categoryName: string,
    productCreateDto: ProductCreateDto,
  ): Promise<ProductDto> {
    const {
      brand,
      name,
      type,
      alcohol_content,
      packaging,
      volume,
      net_price,
      vat,
      gross_price,
      wrappage_net_price,
      wrappage_gross_price,
      description,
    } = productCreateDto;

    const category = await this.categoryService.getCategoryForProduct(categoryName);

    const product: Product = await this.productRepository.create({
      brand,
      name,
      type,
      alcohol_content,
      packaging,
      volume,
      net_price,
      vat,
      gross_price,
      wrappage_net_price,
      wrappage_gross_price,
      description,
      category
    });

    await this.productRepository.save(product);

    return toProductDto(product);
  }

  async updateProduct(id: string, productDto: ProductDto): Promise<ProductDto> {
    let product: Product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new HttpException(`Product doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    await this.productRepository.update(id, productDto);

    return toProductDto(product);
  }

  async deleteProduct(id: string): Promise<ProductDto> {
    const product: Product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new HttpException(`Product doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    await this.productRepository.delete(id);

    return toProductDto(product);
  }
}
