import { CategoryDto } from "../category/dto/category.dto";
import { Category } from "../category/entities/category.entity";
import { ProductDto } from "../product/dto/product.dto";
import { Product } from "../product/entities/product.entity";
import { UserDto } from "../user/dto/user.dto";
import { LoginUserDto } from "../user/dto/user.login.dto";
import { User } from "../user/entities/user.entity";

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
  