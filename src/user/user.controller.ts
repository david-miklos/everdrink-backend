import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { Role } from './role.enum';
import { UserRoleDto } from './dto/user.role.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from 'src/auth/decorators/routes.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles(Role.ADMIN)
  @Get('')
  async findAll(): Promise<UserDto[]> {
    return await this.userService.getAllUsers();
  }

  @Roles(Role.ADMIN)
  @Get('guests')
  async findGuests(): Promise<UserDto[]> {
    return await this.userService.getGuests();
  }

  @Roles(Role.ADMIN)
  @Get(':checkoutId/checkout')
  async findByCheckout(@Param('checkoutId') checkoutId: string): Promise<UserDto> {
    return await this.userService.getByCheckout(checkoutId);
  }

  @Public()
  //@Roles(Role.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.getOneUser(id);
  }

  @Public()
  // @Roles(Role.ADMIN)
  @Put(':id/update_role')
  async update(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.updateUserRole(id);
  }

  //@Roles(Role.ADMIN)
  @Delete(':id/delete')
  async delete(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.deleteUser(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<Object> {
    const { originalname, mimetype } = file;
    return { originalname, mimetype };
  }

  @Roles(Role.ADMIN)
  @Get(':filepath/getfile')
  seeUploadedFile(@Param('filepath') file, @Res() res) {
    // return res.sendFile(file, { root: './uploads' });
    return res.sendFile(file, { root: './uploads' });
  }
}
