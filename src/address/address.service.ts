import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toAddressDto } from 'src/shared/utils';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { AddressCreateDto } from './dto/address.create.dto';
import { AddressDto } from './dto/address.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    private userService: UserService,
  ) {}

  async getAddresses(): Promise<AddressDto[]> {
    const addresses = await this.addressRepository.find();
    return addresses.map((address) => toAddressDto(address));
  }

  async createAddress(addressCreateDto: AddressCreateDto): Promise<AddressDto> {
    const {
      email,
      phone,
      country,
      region,
      zip,
      city,
      street,
      street_number,
    } = addressCreateDto;
    const user: User = await this.userService.findForValidation(email);
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

    return toAddressDto(address);
  }

  async updateAddress(
    id: string,
    addressDto: AddressDto,
  ): Promise<AddressDto> {
    let address: Address = await this.addressRepository.findOne({
      where: { id },
    });

    if (!address) {
      throw new HttpException(`address doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    await this.addressRepository.update(id, addressDto); // update

    return toAddressDto(address);
  }

  async deleteAddress(id: string): Promise<AddressDto> {
    const address: Address = await this.addressRepository.findOne({
      where: { id },
    });

    if (!address) {
      throw new HttpException(`address doesn't exist`, HttpStatus.BAD_REQUEST);
    }
      
    await this.addressRepository.delete(id); // delete todo list

    return toAddressDto(address);
  }
}
