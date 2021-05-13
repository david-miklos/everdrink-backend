import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { CategoryModule } from './category/category.module';
import { AddressModule } from './address/address.module';
import { OrderModule } from './order/order.module';
import { CheckoutModule } from './checkout/checkout.module';


@Module({
  imports: [
    BootstrapModule,
    AuthModule,
    UserModule,
    ProductModule,
    CategoryModule,
    AddressModule,
    CheckoutModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
