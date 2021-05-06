import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderService } from 'src/order/order.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
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

  async getAll(): Promise<Address[]> {
    const addresses = await this.addressRepository.find();
    return addresses;
  }

  async getOne(id: string): Promise<Address> {
    const address = await this.addressRepository.findOne({
      where: {
        id: id,
      },
    });
    return address;
  }

  async getByUser(userId: string): Promise<Address[]> {
    const address = await this.addressRepository.find({
      where: { user: userId },
    });
    return address;
  }

  async getAdmin(): Promise<Address[]> {
    const admin = await this.userService.getAdmin();
    const address = await this.addressRepository.find({
      where: { user: admin },
    });
    return address;
  }

  async createAddress(
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
    const user: User = await this.userService.getOneUser(userId);
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

  // async updateAddress(id: string, addressDto: AddressDto): Promise<AddressDto> {
  //   let address: Address = await this.addressRepository.findOne({
  //     where: { id },
  //   });

  //   if (!address) {
  //     throw new HttpException(`address doesn't exist`, HttpStatus.BAD_REQUEST);
  //   }

  //   await this.addressRepository.update(id, addressDto); // update

  //   return toAddressDto(address);
  // }

  async deleteAddress(id: string): Promise<Address> {
    const address: Address = await this.addressRepository.findOne({
      where: { id },
    });

    if (!address) {
      throw new HttpException(`address doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    await this.addressRepository.delete(id); // delete todo list

    return address;
  }
}
