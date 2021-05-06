import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/routes.decorator';
import { CreateOrderDto } from './dto/order.create.dto';
import { Order } from './entities/order.entity';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Public()
  @Get('')
  async findAll(): Promise<Order[]> {
    return await this.orderService.getAll();
  }

  @Public()
  @Get(':checkoutId/checkout')
  async findByCheckout(@Param('checkoutId') checkoutId: string): Promise<Order[]> {
    return await this.orderService.getByCheckout(checkoutId);
  }

  //@Roles(Role.ADMIN)
  @Post('/create')
  async create(@Body() createOrderDto: CreateOrderDto,): Promise<Order> {
    // const email = req.user.email;
    return await this.orderService.createOrder(createOrderDto);
  }

  // @Public()
  // //@Roles(Role.ADMIN)
  // @Put(':id/update')
  // async update(): Promise<Order> {
  //   return await this.orderService.updateOrder();
  // }
  
  @Public()
  //@Roles(Role.ADMIN)
  @Delete(':id/delete')
  async delete(@Param('id') id: string): Promise<Order> {
    return await this.orderService.deleteOrder(id);
  }
}
