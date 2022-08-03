import { OrderDto } from 'src/order/dto/order.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { Shipping } from '../shipping.enum';

export class CheckoutDto {
  id: string;
  shipping: Shipping;
  user: UserDto;
  orders: OrderDto[];
}
