import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { comparePasswords } from '../shared/utils';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/user.create.dto';
import { RegistrationStatus } from './interfaces/registration.status.interface';
import { UserDto } from '../user/dto/user.dto';
import { SignInStatusInterface } from './interfaces/sign.in.status.interface';
import { LoginUserDto } from '../user/dto/user.login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any>{
    const user = await this.userService.findForValidation(email);
    const areEqual = await comparePasswords(user.password, password);

    if (user && areEqual) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

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

  async signIn(loginUserDto: LoginUserDto): Promise<SignInStatusInterface> {
    //Payload must be an object
    const {id, email, role} = await this.userService.findForJwt(loginUserDto);
    return {
      payload: {id, email, role},
      access_token: this.jwtService.sign({id, email, role}),
      expires_in: process.env.JWT_EXPIRES_IN,
    };
  }
}
