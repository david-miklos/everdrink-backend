import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { Public } from 'src/auth/decorators/routes.decorator';
import { AddressService } from './address.service';
import { AddressCreateDto } from './dto/address.create.dto';
import { Address } from './entities/address.entity';

@Controller('address')
export class AddressController {
    constructor(private addressService: AddressService) {}

    @Public()
    @Get('')
    async findAll(): Promise<Address[]> {
      return await this.addressService.getAll();
    }
  
    @Public()
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Address> {
      return await this.addressService.getOne(id);
    }
  
    @Public()
    @Get(':userId/user')
    async findByUser(@Param('userId') userId: string): Promise<Address[]> {
      return await this.addressService.getByUser(userId);
    }
    
    @Public()
    @Get('admin/get')
    async findAdmin(): Promise<Address[]> {
      return await this.addressService.getAdmin();
    }


    //@Roles(Role.ADMIN)
    @Post('create')
    async create(
      @Req() req,
      @Body() addressCreateDto: AddressCreateDto,
    ): Promise<Address> {
      const userId: string = req.user.id;
      return await this.addressService.createAddress(userId, addressCreateDto);
    }
  
    // @Public()
    // //@Roles(Role.ADMIN)
    // @Put(':id/update')
    // async update(
    //   @Param('id') id: string,
    //   @Body() AddressDto: AddressDto,
    // ): Promise<AddressDto> {
    //   return await this.addressService.updateAddress(id, AddressDto);
    // }
  
    @Public()
    // @Roles(Role.ADMIN)
    @Delete(':id/delete')
    async delete(@Param('id') id: string): Promise<Address> {
      return await this.addressService.deleteAddress(id);
    }
}
