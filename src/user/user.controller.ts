import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Role } from './role.enum';
import { UserRoleDto } from './dto/user.role.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles(Role.GUEST, Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @Get('getall')
  async findAll(): Promise<UserDto[]> {
    return await this.userService.getAllUsers();
  }

  @Roles(Role.GUEST, Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @Get(':id/getone')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.getOneUser(id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @Put(':id/update')
  async update(
    @Param('id') id: string,
    @Body() userRoleDto: UserRoleDto,
  ): Promise<UserDto> {
    return await this.userService.updateUserRole(id, userRoleDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @Delete(':id/delete')
  async delete(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.deleteUser(id);
  }
}
