import { CategoryDto } from "src/category/dto/category.dto";
import { Category } from "src/category/entities/category.entity";

export class ProductDto {
  id: string;
  brand: string;
  name: string;
  type: string;
  alcohol_content: string;
  packaging: string;
  volume: string;
  net_price: number;
  vat: number;
  gross_price: number;
  wrappage_net_price: number;
  wrappage_gross_price: number;
  description: string;
}
