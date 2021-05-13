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
import { Public } from 'src/auth/decorators/routes.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/user/role.enum';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Public()
  @Get('')
  async getAll(): Promise<ProductDto[]> {
    return await this.productService.findAll();
  }

  @Public()
  @Get(':id/get')
  async getOne(@Param('id') id: string): Promise<ProductDto> {
    return await this.productService.findOne(id);
  }

  @Public()
  @Get(':categoryId/category')
  async getAllByCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<ProductDto[]> {
    return await this.productService.findAllByCategory(categoryId);
  }

  @Roles(Role.ADMIN)
  @Post(':categoryId/create')
  async create(
    @Body() productCreateDto: ProductCreateDto,
    @Param('categoryId') categoryId: string,
  ): Promise<ProductDto> {
    return await this.productService.create(categoryId, productCreateDto);
  }

  @Roles(Role.ADMIN)
  @Put(':id/update')
  async update(
    @Param('id') id: string,
    @Body() productDto: ProductDto,
  ): Promise<ProductDto> {
    return await this.productService.update(id, productDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id/delete')
  async delete(@Param('id') id: string): Promise<ProductDto> {
    return await this.productService.delete(id);
  }
}
