import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtPayload } from './interfaces/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../user/dto/user.login.dto';
import { UserService } from '../user/user.service';
import { RegistrationStatus } from './interfaces/registration.status.interface';
import { UserDto } from '../user/dto/user.dto';
import { CreateUserDto } from '../user/dto/user.create.dto';
import { LoginStatus } from './interfaces/login.status.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'user registered',
    };
    try {
      await this.userService.create(createUserDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async signIn(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    // find user in db
    const user = await this.userService.findByLogin(loginUserDto);

    // generate and sign token
    const token = this._createToken(user);

    return {
      email: user.email,
      ...token,
    };
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.userService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken({ email }: UserDto): any {
    const user: JwtPayload = { email };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: process.env.JWT_EXPIRES_IN,
      accessToken,
    };
  }
}
