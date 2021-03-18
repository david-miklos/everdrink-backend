import * as bcrypt from 'bcrypt';
import { Product } from '../product/entities/product.entity';
import { ProductDto } from '../product/dto/product.dto';
import { User } from '../user/entities/user.entity';
import { UserDto } from '../user/dto/user.dto';

export const comparePasswords = async (userPassword, currentPassword) => {
  return await bcrypt.compare(currentPassword, userPassword);
};

export const toUserDto = (data: User): UserDto => {
  const { id, email, role } = data;
  const userDto: UserDto = { id, email, role };
  return userDto;
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
