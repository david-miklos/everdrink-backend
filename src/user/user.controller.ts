import {
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
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from 'src/auth/decorators/routes.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles(Role.ADMIN)
  @Get('')
  async getAll(): Promise<UserDto[]> {
    return await this.userService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get('guests')
  async getGuests(): Promise<UserDto[]> {
    return await this.userService.findGuests();
  }

  @Roles(Role.ADMIN)
  @Get(':checkoutId/checkout')
  async getByCheckout(
    @Param('checkoutId') checkoutId: string,
  ): Promise<UserDto> {
    return await this.userService.findByCheckout(checkoutId);
  }

  @Roles(Role.ADMIN)
  @Get(':id/get')
  async getOne(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Put(':id/approve')
  async updateRole(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.updateRole(id);
  }

  @Roles(Role.ADMIN)
  @Delete(':id/delete')
  async delete(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.delete(id);
  }

  @Roles(Role.GUEST, Role.PARTNER)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<Object> {
    const { originalname, mimetype } = file;
    return { originalname, mimetype };
  }

  @Public()
  @Get(':filepath/getfile')
  getFile(@Param('filepath') file, @Res() res) {
    return res.sendFile(file, { root: './uploads' });
  }
}
