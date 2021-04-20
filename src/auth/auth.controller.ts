import { Controller, Request, Post, UseGuards, Get, HttpStatus, HttpException, Body } from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local.auth.guard";
import { AuthService } from "./auth.service";
import { RegistrationStatus } from "./interfaces/registration.status.interface";
import { CreateUserDto } from "../user/dto/user.create.dto";
import { Public } from "./decorators/routes.decorator";
import { UserDto } from "../user/dto/user.dto";
import { SignInStatusInterface } from "./interfaces/sign.in.status.interface";
import { LoginUserDto } from "../user/dto/user.login.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  async signUp(
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

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Body() loginUserDto: LoginUserDto): Promise<SignInStatusInterface> {
    return this.authService.signIn(loginUserDto);
  }
}
