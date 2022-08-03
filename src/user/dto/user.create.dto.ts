import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from '../role.enum';

export class CreateUserDto {
  @IsNotEmpty() @IsEmail() email: string;
  @IsNotEmpty() password: string;
  role: Role;
}
