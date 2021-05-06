import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { Public } from 'src/auth/decorators/routes.decorator';
import { Order } from 'src/order/entities/order.entity';
import { OrderService } from 'src/order/order.service';
import { CheckoutService } from './checkout.service';
import { CreateCheckoutDto } from './dto/checkout.create.dto';
import { CheckoutDto } from './dto/checkout.dto';
import { Checkout } from './entities/checkout.entity';
import { Shipping } from './shipping.enum';

@Controller('checkout')
export class CheckoutController {
    constructor(private checkoutService: CheckoutService) {}

  @Public()
  @Get('')
  async findAll(): Promise<Checkout[]> {
    return await this.checkoutService.getAll();
  }

  //@Roles(Role.ADMIN)
  @Post('/create')
  async create(@Req() req,  @Body() createCheckoutDto: CreateCheckoutDto): Promise<Checkout> {
    const userId = req.user.id;
    return await this.checkoutService.createCheckout(userId, createCheckoutDto);
  }

  // @Public()
  // //@Roles(Role.ADMIN)
  // @Put(':id/update')
  // async update(): Promise<Order> {
  //   return await this.orderService.updateOrder();
  // }
  
  //@Roles(Role.ADMIN)
  @Public()
  @Delete(':id/delete')
  async delete(@Param('id') id: string): Promise<Checkout> {
    return await this.checkoutService.deleteCheckout(id);
  }
}
