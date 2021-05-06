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


@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Public()
  @Get('')
  async findAll(): Promise<ProductDto[]> {
    return await this.productService.getAll();
  }

  @Public()
  @Get(':id/get')
  async findOne(@Param('id') id: string): Promise<ProductDto> {
    return await this.productService.getOne(id);
  }

  // @Public()
  // @Get(':categoryId/brands')
  // async getBrands(@Param('categoryId') categoryId: string): Promise<any> {
  //   return await this.productService.getBrandsByCategory(categoryId);
  // }

  // @Public()
  // @Get(':categoryId/packaging')
  // async getPackaging(@Param('categoryId') categoryId: string): Promise<any> {
  //   return await this.productService.getPackageingByCategory(categoryId);
  // }

  @Public()
  @Get(':categoryId/category')
  async findAllWithCategory(@Param('categoryId') categoryId: string): Promise<any> {
    return await this.productService.getAllByCatgory(categoryId);
  }


  @Public()
  //@Roles(Role.ADMIN)
  @Post(':name/create')
  async create(
    @Body() productCreateDto: ProductCreateDto,
    @Param('name') categoryName: string,
  ): Promise<ProductDto> {
    return await this.productService.createProduct(categoryName,productCreateDto);
  }

  @Public()
  //@Roles(Role.ADMIN)
  @Put(':id/update')
  async update(
    @Param('id') id: string,
    @Body() productDto: ProductDto,
  ): Promise<ProductDto> {
    return await this.productService.updateProduct(id, productDto);
  }
  @Public()
  //@Roles(Role.ADMIN)
  @Delete(':id/delete')
  async delete(@Param('id') id: string): Promise<ProductDto> {
    return await this.productService.deleteProduct(id);
  }
}
