import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { Address } from './entities/address.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Address])],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
