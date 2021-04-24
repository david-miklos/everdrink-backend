import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Public } from 'src/auth/decorators/routes.decorator';
import { AddressService } from './address.service';
import { AddressCreateDto } from './dto/address.create.dto';
import { AddressDto } from './dto/address.dto';

@Controller('address')
export class AddressController {
    constructor(private addressService: AddressService) {}

    @Public()
    @Get('')
    async getAddresses(): Promise<AddressDto[]> {
      return await this.addressService.getAddresses();
    }

    @Public()
    //@Roles(Role.ADMIN)
    @Post('create')
    async create(
      @Body() addressCreateDto: AddressCreateDto,
    ): Promise<AddressDto> {
      return await this.addressService.createAddress(addressCreateDto);
    }
  
    @Public()
    //@Roles(Role.ADMIN)
    @Put(':id/update')
    async update(
      @Param('id') id: string,
      @Body() AddressDto: AddressDto,
    ): Promise<AddressDto> {
      return await this.addressService.updateAddress(id, AddressDto);
    }
  
    @Public()
    // @Roles(Role.ADMIN)
    @Delete(':id/delete')
    async delete(@Param('id') id: string): Promise<AddressDto> {
      return await this.addressService.deleteAddress(id);
    }
}
