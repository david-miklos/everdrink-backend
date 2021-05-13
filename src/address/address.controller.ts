import { Controller } from '@nestjs/common';
import { Body, Get, Param, Post, Req } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/user/role.enum';
import { AddressService } from './address.service';
import { AddressCreateDto } from './dto/address.create.dto';
import { Address } from './entities/address.entity';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Roles(Role.PARTNER)
  @Get('')
  async getAll(): Promise<Address[]> {
    return await this.addressService.findAll();
  }

  @Roles(Role.PARTNER)
  @Get('admin')
  async getAdmin(): Promise<Address[]> {
    return await this.addressService.findAdmin();
  }

  @Roles(Role.PARTNER)
  @Get(':id/get')
  async findOne(@Param('id') id: string): Promise<Address> {
    return await this.addressService.findOne(id);
  }

  @Roles(Role.ADMIN,Role.PARTNER)
  @Get(':userId/user')
  async findByUser(@Param('userId') userId: string): Promise<Address[]> {
    return await this.addressService.findByUser(userId);
  }

  @Roles(Role.GUEST, Role.PARTNER)
  @Post('create')
  async create(
    @Req() req,
    @Body() addressCreateDto: AddressCreateDto,
  ): Promise<Address> {
    const userId: string = req.user.id;
    return await this.addressService.create(userId, addressCreateDto);
  }
}
