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
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from 'src/auth/decorators/routes.decorator';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Public()
  @Get('')
  async findAll(): Promise<ProductDto[]> {
    return await this.productService.getAllProducts();
  }

  @Get(':id/get')
  async findOne(@Param('id') id: string): Promise<ProductDto> {
    return await this.productService.getOneProduct(id);
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
