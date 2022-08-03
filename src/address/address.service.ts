import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { AddressCreateDto } from './dto/address.create.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    private userService: UserService,
  ) {}

  async findAll(): Promise<Address[]> {
    const addresses = await this.addressRepository.find();
    return addresses;
  }

  async findOne(id: string): Promise<Address> {
    const address = await this.addressRepository.findOne({
      where: {
        id: id,
      },
      relations:['user']
    });

    if (!address) {
      throw new HttpException(`Address not found`, HttpStatus.NOT_FOUND);
    }

    return address;
  }

  async findByUser(userId: string): Promise<Address[]> {
    const addresses = await this.addressRepository.find({
      where: { user: userId },
    });
    return addresses;
  }

  async findAdmin(): Promise<Address[]> {
    const admin = await this.userService.findAdmin();
    const address = await this.addressRepository.find({
      where: { user: admin },
    });
    return address;
  }

  async create(
    userId: string,
    addressCreateDto: AddressCreateDto,
  ): Promise<Address> {
    const {
      phone,
      country,
      region,
      zip,
      city,
      street,
      street_number,
    } = addressCreateDto;
    const user: User = await this.userService.findOne(userId);
    const address: Address = await this.addressRepository.create({
      phone,
      country,
      region,
      zip,
      city,
      street,
      street_number,
      user,
    });
    await this.addressRepository.save(address);

    return address;
  }
}
