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
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../user/role.enum';
import { CreateOrderDto } from './dto/order.create.dto';
import { Order } from './entities/order.entity';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Roles(Role.ADMIN)
  @Get('')
  async getAll(): Promise<Order[]> {
    return await this.orderService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get(':checkoutId/checkout')
  async getByCheckout(@Param('checkoutId') checkoutId: string): Promise<Order[]> {
    return await this.orderService.findByCheckout(checkoutId);
  }

  @Public()
  // @Roles(Role.PARTNER)
  @Post('/create')
  async create(@Body() createOrderDto: CreateOrderDto,): Promise<Order> {
    return await this.orderService.create(createOrderDto);
  }
  
  @Roles(Role.ADMIN)
  @Delete(':id/delete')
  async delete(@Param('id') id: string): Promise<Order> {
    return await this.orderService.delete(id);
  }
}
