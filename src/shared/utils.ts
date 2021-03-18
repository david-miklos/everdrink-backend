import * as bcrypt from 'bcrypt';
import { Product } from '../product/entities/product.entity';
import { ProductDto } from '../product/dto/product.dto';

export const comparePasswords = async (userPassword, currentPassword) => {
  return await bcrypt.compare(currentPassword, userPassword);
};

export const toProductDto = (data: Product): ProductDto => {
  const {
    id,
    description,
    gsku,
    quantity,
    package_type,
    volume,
    producer,
    sku,
    title,
    type,
  } = data;

  const productDto: ProductDto = {
    id,
    description,
    gsku,
    quantity,
    package_type,
    volume,
    producer,
    sku,
    title,
    type,
  };
  return productDto;
};
