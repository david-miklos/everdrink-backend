import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toCategoryDto } from 'src/shared/utils';
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

  async getAllCategorys(): Promise<CategoryDto[]> {
    const categorys = await this.categoryRepository.find({
      order: {
        order: 'ASC',
      },
    });
    return categorys.map((category) => toCategoryDto(category));
  }

  async getAllCategorysWithProducts(): Promise<CategoryDto[]> {
    const categorysWithProducts = await this.categoryRepository.find({
      relations: ['products'],
      order: {
        order: 'ASC',
      },
    });
    return categorysWithProducts.map((category) => toCategoryDto(category));
  }

  async getOneCategory(name: string): Promise<CategoryDto> {
    const category = await this.categoryRepository.findOne({
      where: { name },
    });

    if (!category) {
      throw new HttpException(`Category doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    return toCategoryDto(category);
  }

  async getOneCategoryWithProducts(name: string): Promise<CategoryDto> {
    const categoryWithProducts = await this.categoryRepository.findOne({
      where: { name },
      relations: ['products'],
    });

    if (!categoryWithProducts) {
      throw new HttpException(`Category doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    return toCategoryDto(categoryWithProducts);
  }

  async createCategory(
    categoryCreateDto: CategoryCreateDto,
  ): Promise<CategoryDto> {
    const category: Category = await this.categoryRepository.create(
      categoryCreateDto,
    );

    await this.categoryRepository.save(category);

    return toCategoryDto(category);
  }

  async updateCategory(
    id: string,
    categoryDto: CategoryDto,
  ): Promise<CategoryDto> {
    let category: Category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!category) {
      throw new HttpException(`Category doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    await this.categoryRepository.update(id, categoryDto); // update

    return toCategoryDto(category);
  }

  async deleteCategory(id: string): Promise<CategoryDto> {
    const category: Category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!category) {
      throw new HttpException(`Category doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    if (category.products && category.products.length > 0) {
      throw new HttpException(
        `Cannot delete this Category, it has existing products`,
        HttpStatus.FORBIDDEN,
      );
    }

    await this.categoryRepository.delete(id); // delete todo list

    return toCategoryDto(category);
  }

  async getCategoryForProduct(name: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { name },
    });

    if (!category) {
      throw new HttpException(`Category doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    return category;
  }
}
