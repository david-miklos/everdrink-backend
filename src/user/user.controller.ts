import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { Roles } from '../auth/roles.decorator';
import { Role } from './role.enum';
import { UserRoleDto } from './dto/user.role.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles(Role.ADMIN)
  @Get('get')
  async findAll(): Promise<UserDto[]> {
    return await this.userService.getAllUsers();
  }

  @Roles(Role.ADMIN)
  @Get(':id/get')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.getOneUser(id);
  }

  @Roles(Role.ADMIN)
  @Put(':id/update_role')
  async update(
    @Param('id') id: string,
    @Body() userRoleDto: UserRoleDto,
  ): Promise<UserDto> {
    return await this.userService.updateUserRole(id, userRoleDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id/delete')
  async delete(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.deleteUser(id);
  }
}
