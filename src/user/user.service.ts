import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/user.login.dto';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/user.create.dto';
import { comparePasswords, toLoginUserDto, toUserDto } from '../shared/utils';
import { UserRoleDto } from './dto/user.role.dto';
import { Role } from './role.enum';

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

  async getByCheckout(checkoutId: string): Promise<User> {
    const orders = await this.userRepository.findOne({
      where: { checkout: checkoutId },
      // relations:['product','checkout']
    });
    return orders;
  }

  async getGuests(): Promise<UserDto[]> {
    const users = await this.userRepository.find({
      where: { role: Role.GUEST },
    });
    return users.map((user) => toUserDto(user));
  }

  async getOneUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new HttpException(`User doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async getAdmin(): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { role: Role.ADMIN },
    });

    if (!user) {
      throw new HttpException(`User doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async updateUserRole(id: string): Promise<UserDto> {
    const user: User = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new HttpException(`User doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    await this.userRepository.update(id, {
      role: Role.PARTNER,
    });

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
