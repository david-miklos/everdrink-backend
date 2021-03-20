import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductCreateDto } from './dto/product.create.dto';
import { ProductDto } from './dto/product.dto';
import { Role } from '../user/role.enum';
import { Roles } from '../auth/roles.decorator';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('get')
  async findAll(): Promise<ProductDto[]> {
    return await this.productService.getAllProducts();
  }

  @Get(':id/get')
  async findOne(@Param('id') id: string): Promise<ProductDto> {
    return await this.productService.getOneProduct(id);
  }

  @Roles(Role.ADMIN)
  @Post('create')
  async create(
    @Body() productCreateDto: ProductCreateDto,
  ): Promise<ProductDto> {
    return await this.productService.createProduct(productCreateDto);
  }

  @Roles(Role.ADMIN)
  @Put(':id/update')
  async update(
    @Param('id') id: string,
    @Body() productDto: ProductDto,
  ): Promise<ProductDto> {
    return await this.productService.updateProduct(id, productDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id/delete')
  async delete(@Param('id') id: string): Promise<ProductDto> {
    return await this.productService.deleteProduct(id);
  }
}
