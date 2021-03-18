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
import { Role } from '../user/role.enum';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Roles(Role.GUEST, Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @Get('get')
  async findAll(): Promise<ProductDto[]> {
    return await this.productService.getAllProducts();
  }

  @Roles(Role.GUEST, Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @Get(':id/get')
  async findOne(@Param('id') id: string): Promise<ProductDto> {
    return await this.productService.getOneProduct(id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @Post('create')
  async create(
    @Body() productCreateDto: ProductCreateDto,
  ): Promise<ProductDto> {
    return await this.productService.createProduct(productCreateDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @Put(':id/update')
  async update(
    @Param('id') id: string,
    @Body() productDto: ProductDto,
  ): Promise<ProductDto> {
    return await this.productService.updateProduct(id, productDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @Delete(':id/delete')
  async delete(@Param('id') id: string): Promise<ProductDto> {
    return await this.productService.deleteProduct(id);
  }
}
