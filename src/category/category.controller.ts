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
    return await this.categoryService.findAll();
  }

  @Public()
  @Get(':id/get')
  async getOne(@Param('id') id: string): Promise<CategoryDto> {
    return await this.categoryService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Post('create')
  async create(
    @Body() categoryCreateDto: CategoryCreateDto,
  ): Promise<CategoryDto> {
    return await this.categoryService.create(categoryCreateDto);
  }

  @Roles(Role.ADMIN)
  @Put(':id/update')
  async update(
    @Param('id') id: string,
    @Body() categoryDto: CategoryDto,
  ): Promise<CategoryDto> {
    return await this.categoryService.update(id, categoryDto);
  }
}
