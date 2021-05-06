import { OrderDto } from 'src/order/dto/order.dto';
import { Order } from 'src/order/entities/order.entity';
import { UserDto } from 'src/user/dto/user.dto';
import { Shipping } from '../shipping.enum';

export class CheckoutDto {
  id: string;
  shipping: Shipping;
  user: UserDto;
  orders: OrderDto[];
}
