import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from '../address/address.module';
import { OrderModule } from '../order/order.module';
import { UserModule } from '../user/user.module';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { Checkout } from './entities/checkout.entity';

@Module({
  imports: [
    AddressModule,
    UserModule,
    forwardRef(() => OrderModule),
    TypeOrmModule.forFeature([Checkout]),
  ],
  controllers: [CheckoutController],
  providers: [CheckoutService],
  exports: [CheckoutService],
})
export class CheckoutModule {}
