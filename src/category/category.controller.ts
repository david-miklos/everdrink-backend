import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Public } from 'src/auth/decorators/routes.decorator';
import { ProductCreateDto } from 'src/product/dto/product.create.dto';
import { ProductDto } from 'src/product/dto/product.dto';
import { Role } from 'src/user/role.enum';
import { CategoryService } from './category.service';
import { CategoryCreateDto } from './dto/category.create.dto';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Public()
  @Get('')
  async getAll(): Promise<CategoryDto[]> {
    return await this.categoryService.getAllCategorys();
  }

  @Public()
  @Get('products')
  async getAllWithProducts(): Promise<CategoryDto[]> {
    return await this.categoryService.getAllCategorysWithProducts();
  }

  @Public()
  @Get(':name')
  async getOne(@Param('name') name: string): Promise<CategoryDto> {
    return await this.categoryService.getOneCategory(name);
  }

  @Public()
  @Get(':name/products')
  async getOneWithProducts(@Param('name') name: string): Promise<CategoryDto> {
    return await this.categoryService.getOneCategoryWithProducts(name);
  }

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
