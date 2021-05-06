import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/routes.decorator';
import { ProductDto } from 'src/product/dto/product.dto';
import { CategoryService } from './category.service';
import { CategoryCreateDto } from './dto/category.create.dto';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Public()
  @Get('')
  async getCategories(): Promise<CategoryDto[]> {
    return await this.categoryService.getCategories();
  }

  // @Public()
  // @Get(':name')
  // async getProducts(@Param('name') name: string): Promise<ProductDto[]> {
  //   return await this.categoryService.getProducts(name);
  // }

  // @Public()
  // @Get('products')
  // async getProducts(): Promise<ProductDto[]> {
  //   return await this.categoryService.getAllProducts();
  // }

  // @Public()
  // @Get(':name')
  // async getOne(@Param('name') name: string): Promise<CategoryDto> {
  //   return await this.categoryService.getOneCategory(name);
  // }

  @Public()
  //@Roles(Role.ADMIN)
  @Post('create')
  async create(
    @Body() categoryCreateDto: CategoryCreateDto,
  ): Promise<CategoryDto> {
    return await this.categoryService.createCategory(categoryCreateDto);
  }

  @Public()
  //@Roles(Role.ADMIN)
  @Put(':id/update')
  async update(
    @Param('id') id: string,
    @Body() categoryDto: CategoryDto,
  ): Promise<CategoryDto> {
    return await this.categoryService.updateCategory(id, categoryDto);
  }

  @Public()
  // @Roles(Role.ADMIN)
  @Delete(':id/delete')
  async delete(@Param('id') id: string): Promise<CategoryDto> {
    return await this.categoryService.deleteCategory(id);
  }
}
