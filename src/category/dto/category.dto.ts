import { ProductDto } from 'src/product/dto/product.dto';

export class CategoryDto {
  id: string;
  name: string;
  display_name: string;
  description: string;
  order: number;
  products: ProductDto[];
}
