import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/user/role.enum';
import { CheckoutService } from './checkout.service';
import { CreateCheckoutDto } from './dto/checkout.create.dto';
import { Checkout } from './entities/checkout.entity';

@Controller('checkout')
export class CheckoutController {
  constructor(private checkoutService: CheckoutService) {}

  @Roles(Role.ADMIN)
  @Get('')
  async getAll(): Promise<Checkout[]> {
    return await this.checkoutService.findAll();
  }

  @Roles(Role.PARTNER)
  @Post('/create')
  async create(
    @Req() req,
    @Body() createCheckoutDto: CreateCheckoutDto,
  ): Promise<Checkout> {
    const userId = req.user.id;
    return await this.checkoutService.createCheckout(userId, createCheckoutDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id/delete')
  async delete(@Param('id') id: string): Promise<Checkout> {
    return await this.checkoutService.deleteCheckout(id);
  }
}
