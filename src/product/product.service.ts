import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductCreateDto } from './dto/product.create.dto';
import { ProductDto } from './dto/product.dto';
import { CategoryService } from '../category/category.service';
import { toProductDto } from '../shared/mappers';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private categoryService: CategoryService,
  ) {}
  async findAll(): Promise<ProductDto[]> {
    const products = await this.productRepository.find();
    return products.map((product) => toProductDto(product));
  }

  async findOne(id: string): Promise<ProductDto> {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new HttpException(`Product not found`, HttpStatus.NOT_FOUND);
    }

    return toProductDto(product);
  }

  async findAllByCategory(categoryId: string): Promise<ProductDto[]> {
    const products = await this.productRepository.find({
      where: { category: categoryId },
    });
    return products.map((product) => toProductDto(product));
  }

  async create(
    categoryId: string,
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

    const category = await this.categoryService.findOne(
      categoryId,
    );

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
      category,
    });

    await this.productRepository.save(product);

    return toProductDto(product);
  }

  async update(id: string, productDto: ProductDto): Promise<ProductDto> {
    let product: Product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new HttpException(`Product not found`, HttpStatus.NOT_FOUND);
    }

    await this.productRepository.update(id, productDto);

    return toProductDto(product);
  }

  async delete(id: string): Promise<ProductDto> {
    const product: Product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new HttpException(`Product not found`, HttpStatus.NOT_FOUND);
    }

    await this.productRepository.delete(id);

    return toProductDto(product);
  }
}
