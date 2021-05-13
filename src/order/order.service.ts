import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckoutService } from 'src/checkout/checkout.service';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/order.create.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private productService: ProductService,
    @Inject(forwardRef(() => CheckoutService)) private checkoutService: CheckoutService,
  ) {}

  async findAll(): Promise<Order[]> {
    const orders = await this.orderRepository.find();
    return orders;
  }

  async findByCheckout(checkoutId: string): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      where: { checkout: checkoutId },
    });
    return orders;
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { quantity, product_id, checkout_id } = createOrderDto;
    const product = await this.productService.findOne(product_id);
    const checkout = await this.checkoutService.findOne(checkout_id);
    const order: Order = await this.orderRepository.create({
      quantity,
      product,
      checkout,
    });
    await this.orderRepository.save(order);
    return order;
  }

  async delete(id: string): Promise<Order> {
    const order: Order = await this.orderRepository.findOne({
      where: { id },
    });

    if (!order) {
      throw new HttpException(`Order not found`, HttpStatus.NOT_FOUND);
    }

    await this.orderRepository.delete(id);

    return order;
  }
}
