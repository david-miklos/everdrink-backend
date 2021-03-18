import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductCreateDto } from './dto/product.create.dto';
import { ProductDto } from './dto/product.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(AuthGuard())
  @Get('get')
  async findAll(): Promise<ProductDto[]> {
    return await this.productService.getAllProducts();
  }

  @UseGuards(AuthGuard())
  @Get(':id/get')
  async findOne(@Param('id') id: string): Promise<ProductDto> {
    return await this.productService.getOneProduct(id);
  }

  @UseGuards(AuthGuard())
  @Post('create')
  async create(
    @Body() productCreateDto: ProductCreateDto,
  ): Promise<ProductDto> {
    return await this.productService.createProduct(productCreateDto);
  }

  @UseGuards(AuthGuard())
  @Put(':id/update')
  async update(
    @Param('id') id: string,
    @Body() productDto: ProductDto,
  ): Promise<ProductDto> {
    return await this.productService.updateProduct(id, productDto);
  }

  @UseGuards(AuthGuard())
  @Delete(':id/delete')
  async delete(@Param('id') id: string): Promise<ProductDto> {
    return await this.productService.deleteProduct(id);
  }
}
