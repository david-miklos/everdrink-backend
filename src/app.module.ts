import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { CategoryModule } from './category/category.module';
import { AddressController } from './address/address.controller';
import { AddressModule } from './address/address.module';


@Module({
  imports: [
    BootstrapModule,
    AuthModule,
    UserModule,
    ProductModule,
    CategoryModule,
    AddressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
