import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from '../role.enum';

export class UserDto {
  @IsNotEmpty() id: string;
  @IsNotEmpty() @IsEmail() email: string;
  role: Role;
}
