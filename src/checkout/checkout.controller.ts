import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/routes.decorator';
import { User } from 'src/user/entities/user.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../user/role.enum';
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


  @Roles(Role.PARTNER, Role.GUEST)
  @Post('/create')
  async create(
    @Req() req,
    @Body() createCheckoutDto: CreateCheckoutDto,
  ): Promise<Checkout> {
    console.log(req.user)
    const userId = req.user.id;
    return await this.checkoutService.createCheckout(userId, createCheckoutDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id/delete')
  async delete(@Param('id') id: string): Promise<Checkout> {
    return await this.checkoutService.deleteCheckout(id);
  }
}
