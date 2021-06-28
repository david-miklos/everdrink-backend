import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toCategoryDto } from '../shared/mappers';
import { Repository } from 'typeorm';
import { CategoryCreateDto } from './dto/category.create.dto';
import { CategoryDto } from './dto/category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<CategoryDto[]> {
    const categories = await this.categoryRepository.find({
      order: {
        order: 'ASC',
      },
    });
    return categories.map((category) => toCategoryDto(category));
  }

  async findOne(id: string): Promise<CategoryDto> {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new HttpException(`Category not found`, HttpStatus.NOT_FOUND);
    }

    return toCategoryDto(category);
  }

  async create(categoryCreateDto: CategoryCreateDto): Promise<CategoryDto> {
    const category: Category = await this.categoryRepository.create(
      categoryCreateDto,
    );

    await this.categoryRepository.save(category);

    return toCategoryDto(category);
  }

  async update(id: string, categoryDto: CategoryDto): Promise<CategoryDto> {
    let category: Category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new HttpException(`Category doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    await this.categoryRepository.update(id, categoryDto);

    return toCategoryDto(category);
  }
}
