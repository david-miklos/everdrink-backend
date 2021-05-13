import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressService } from 'src/address/address.service';
import { Address } from 'src/address/entities/address.entity';
import { OrderService } from 'src/order/order.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateCheckoutDto } from './dto/checkout.create.dto';
import { Checkout } from './entities/checkout.entity';

@Injectable()
export class CheckoutService {
  constructor(
    @InjectRepository(Checkout)
    private checkoutRepository: Repository<Checkout>,
    private userService: UserService,
    @Inject(forwardRef(() => AddressService))
    private addressService: AddressService,
  ) {}

  async findAll(): Promise<Checkout[]> {
    const checkouts = await this.checkoutRepository.find({
      relations: ['user', 'address', 'orders', 'orders.product'],
    });
    return checkouts;
  }

  async findOne(id: string): Promise<Checkout> {
    const checkout = await this.checkoutRepository.findOne({
      where: { id },
    });

    if (!checkout) {
      throw new HttpException(`Checkout not found`, HttpStatus.NOT_FOUND);
    }

    return checkout;
  }

  async createCheckout(
    userId: string,
    createCheckoutDto: CreateCheckoutDto,
  ): Promise<Checkout> {
    const { shipping, addressId } = createCheckoutDto;
    const user: User = await this.userService.findOne(userId);
    const address: Address = await this.addressService.findOne(addressId);
    const checkout: Checkout = await this.checkoutRepository.create({
      shipping,
      user,
      address,
    });
    await this.checkoutRepository.save(checkout);
    return checkout;
  }

  async deleteCheckout(id: string): Promise<Checkout> {
    const checkout: Checkout = await this.checkoutRepository.findOne({
      where: { id },
    });
    if (!checkout) {
      throw new HttpException(`Checkout not found`, HttpStatus.NOT_FOUND);
    }

    await this.checkoutRepository.delete(id);

    return checkout;
  }
}
