import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/user.login.dto';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/user.create.dto';
import { comparePasswords, toLoginUserDto, toUserDto } from '../shared/utils';
import { UserRoleDto } from './dto/user.role.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  /*
  // eslint-disable-next-line @typescript-eslint/ban-types
  async findOne(options?: object): Promise<LoginUserDto> {
    const user = await this.userRepository.findOne(options);
    return toLoginUserDto(user);
  }*/

  async findForValidation(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async findForJwt({ email, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    return toUserDto(user);
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const { email, password, role } = createUserDto;

    const userInDb = await this.userRepository.findOne({ where: { email } });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: User = await this.userRepository.create({
      email,
      password,
      role,
    });

    await this.userRepository.save(user);

    return toUserDto(user);
  }

  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => toUserDto(user));
  }

  async getOneUser(id: string): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new HttpException(`User doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    return toUserDto(user);
  }

  async updateUserRole(id: string, userRoleDto: UserRoleDto): Promise<UserDto> {
    const user: User = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new HttpException(`User doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    await this.userRepository.update(id, userRoleDto);

    return toUserDto(user);
  }

  async deleteUser(id: string): Promise<UserDto> {
    const user: User = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new HttpException(`User doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    await this.userRepository.delete({ id });

    return toUserDto(user);
  }
}
