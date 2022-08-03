import { ProductDto } from 'src/product/dto/product.dto';
export class OrderDto {
  id: string;
  quantity: number;
  product: ProductDto;
}
