import { ProductDto } from "src/product/dto/product.dto";
import { Product } from "src/product/entities/product.entity";

export class OrderDto {
    id: string;
    quantity: number;
    product: ProductDto;
}