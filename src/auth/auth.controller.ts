import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginUserDto } from '../user/dto/user.login.dto';
import { RegistrationStatus } from './interfaces/registration.status.interface';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/user.create.dto';
import { LoginStatus } from './interfaces/login.status.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign_up')
  public async signUp(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.signUp(
      createUserDto,
    );
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Post('sign_in')
  public async signIn(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<LoginStatus> {
    return await this.authService.signIn(loginUserDto);
  }
}
