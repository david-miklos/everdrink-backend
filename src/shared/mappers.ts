import { CategoryDto } from "src/category/dto/category.dto";
import { Category } from "src/category/entities/category.entity";
import { ProductDto } from "src/product/dto/product.dto";
import { Product } from "src/product/entities/product.entity";
import { UserDto } from "src/user/dto/user.dto";
import { LoginUserDto } from "src/user/dto/user.login.dto";
import { User } from "src/user/entities/user.entity";

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
  