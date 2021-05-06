import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { check } from 'prettier';
import { AddressService } from 'src/address/address.service';
import { Address } from 'src/address/entities/address.entity';
import { OrderService } from 'src/order/order.service';
// import { toCheckoutDto } from 'src/shared/utils';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateCheckoutDto } from './dto/checkout.create.dto';
import { CheckoutDto } from './dto/checkout.dto';
import { Checkout } from './entities/checkout.entity';
import { Shipping } from './shipping.enum';

@Injectable()
export class CheckoutService {
  constructor(
    @InjectRepository(Checkout)
    private checkoutRepository: Repository<Checkout>,
    private userService: UserService,
    @Inject(forwardRef(() => AddressService))
    private addressService: AddressService,
    @Inject(forwardRef(() => OrderService)) private orderService: OrderService,
  ) {}

  async getAll(): Promise<any> {
    const checkouts = await this.checkoutRepository.find({
      relations: ['user', 'address', 'orders', 'orders.product'],
    });
    return checkouts;
  }

  async getOne(id: string): Promise<Checkout> {
    const checkout = await this.checkoutRepository.findOne({
      where: { id },
    });

    if (!checkout) {
      throw new HttpException(`Product doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    return checkout;
  }

  async createCheckout(
    userId: string,
    createCheckoutDto: CreateCheckoutDto,
  ): Promise<Checkout> {
    const { shipping, addressId } = createCheckoutDto;
    const user: User = await this.userService.getOneUser(userId);
    const address: Address = await this.addressService.getOne(addressId);
    const checkout: Checkout = await this.checkoutRepository.create({
      shipping,
      user,
      address,
    });
    await this.checkoutRepository.save(checkout);
    return checkout;
  }

  async updateCheckout(): Promise<Checkout> {
    return;
  }

  async deleteCheckout(id: string): Promise<Checkout> {
    const checkout: Checkout = await this.checkoutRepository.findOne({
      where: { id },
    });
    if (!checkout) {
      throw new HttpException(`Checkout doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    await this.checkoutRepository.delete(id);

    return checkout;
  }
}
