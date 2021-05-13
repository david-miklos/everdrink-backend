import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/user.login.dto';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/user.create.dto';
import { Role } from './role.enum';
import { toUserDto } from 'src/shared/mappers';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async findForJwt(loginUserDto: LoginUserDto): Promise<UserDto> {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
    });

    return toUserDto(user);
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const { email, password, role } = createUserDto;

    const userInDb = await this.userRepository.findOne({ where: { email } });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const user: User = await this.userRepository.create({
      email,
      password,
      role,
    });

    await this.userRepository.save(user);

    return toUserDto(user);
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => toUserDto(user));
  }

  async findByCheckout(checkoutId: string): Promise<User> {
    const orders = await this.userRepository.findOne({
      where: { checkout: checkoutId },
    });
    return orders;
  }

  async findGuests(): Promise<UserDto[]> {
    const users = await this.userRepository.find({
      where: { role: Role.GUEST },
    });
    return users.map((user) => toUserDto(user));
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async findAdmin(): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { role: Role.ADMIN },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async updateRole(id: string): Promise<UserDto> {
    const user: User = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.userRepository.update(id, {
      role: Role.PARTNER,
    });

    return toUserDto(user);
  }

  async delete(id: string): Promise<UserDto> {
    const user: User = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.userRepository.delete({ id });

    return toUserDto(user);
  }
}
