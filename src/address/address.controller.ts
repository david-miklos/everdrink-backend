import { Controller } from '@nestjs/common';
import { Body, Get, Param, Post, Req } from '@nestjs/common';
import { Public } from 'src/auth/decorators/routes.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../user/role.enum';
import { AddressService } from './address.service';
import { AddressCreateDto } from './dto/address.create.dto';
import { Address } from './entities/address.entity';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Public()
  @Get('')
  async getAll(): Promise<Address[]> {
    return await this.addressService.findAll();
  }

  @Public()
  @Get('admin')
  async getAdmin(): Promise<Address[]> {
    return await this.addressService.findAdmin();
  }

  @Public()
  @Get(':id/get')
  async findOne(@Param('id') id: string): Promise<Address> {
    return await this.addressService.findOne(id);
  }

  @Public()
  @Get(':userId/user')
  async findByUser(@Param('userId') userId: string): Promise<Address[]> {
    return await this.addressService.findByUser(userId);
  }

  @Roles(Role.ADMIN, Role.PARTNER, Role.GUEST)
  @Post('create')
  async create(
    @Req() req,
    @Body() addressCreateDto: AddressCreateDto,
  ): Promise<Address> {
    const userId: string = req.user.id;
    return await this.addressService.create(userId, addressCreateDto);
  }
}
