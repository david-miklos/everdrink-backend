import * as bcrypt from 'bcrypt';
import { Product } from '../product/entities/product.entity';
import { ProductDto } from '../product/dto/product.dto';
import { User } from '../user/entities/user.entity';
import { UserDto } from '../user/dto/user.dto';
import { LoginUserDto } from '../user/dto/user.login.dto';
import { Category } from 'src/category/entities/category.entity';
import { CategoryDto } from 'src/category/dto/category.dto';
import { Address } from 'src/address/entities/address.entity';
import { Checkout } from 'src/checkout/entities/checkout.entity';
import { CheckoutDto } from 'src/checkout/dto/checkout.dto';
import { OrderDto } from 'src/order/dto/order.dto';
import { Order } from 'src/order/entities/order.entity';

export const comparePasswords = async (userPassword, currentPassword) => {
  return await bcrypt.compare(currentPassword, userPassword);
};

export const toUserDto = (data: User): UserDto => {
  const { id, email, role } = data;
  const userDto: UserDto = { id, email, role };
  return userDto;
};

export const toLoginUserDto = (data: User): LoginUserDto => {
  const { email, password } = data;
  const loginUserDto: LoginUserDto = { email, password };
  return loginUserDto;
};

export const toCategoryDto = (data: Category): CategoryDto => {
  const { id, name, display_name, description, order, products } = data;
  const categoryDto: CategoryDto = {
    id,
    name,
    display_name,
    description,
    order,
    products,
  };
  return categoryDto;
};

export const toProductDto = (data: Product): ProductDto => {
  const {
    id,
    brand,
    name,
    type,
    alcohol_content,
    packaging,
    volume,
    net_price,
    vat,
    gross_price,
    wrappage_net_price,
    wrappage_gross_price,
    description,
  } = data;

  const productDto: ProductDto = {
    id,
    brand,
    name,
    type,
    alcohol_content,
    packaging,
    volume,
    net_price,
    vat,
    gross_price,
    wrappage_net_price,
    wrappage_gross_price,
    description,
  };
  return productDto;
};

export const fileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(png)$/)) {
    return callback(new Error('Only png files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = req.user.id;
  const fileExtName = file.originalname.split('.')[1];
  callback(null, `${name}.${fileExtName}`);
};
