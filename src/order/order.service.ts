import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    private userService: UserService,
    private productService: ProductService,
    private checkoutService: CheckoutService,
  ) {}

  async getAll(): Promise<Order[]> {
    const orders = await this.orderRepository.find();
    return orders;
  }

  async getByCheckout(checkoutId: string): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      where: { checkout: checkoutId },
      // relations:['product','checkout']
    });
    return orders;
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { quantity, product_id, checkout_id } = createOrderDto;
    // const user = await this.userService.findForValidation(email);
    const product = await this.productService.getOne(product_id);
    const checkout = await this.checkoutService.getOne(checkout_id);
    const order: Order = await this.orderRepository.create({
      quantity,
      product,
      checkout,
    });
    await this.orderRepository.save(order);
    return order;
  }

  async updateOrder(): Promise<Order> {
    return;
  }

  async deleteOrder(id: string): Promise<Order> {
    const order: Order = await this.orderRepository.findOne({
      where: { id },
    });

    if (!order) {
      throw new HttpException(`Order doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    await this.orderRepository.delete(id);

    return order;
  }

  // async deleteOrders(checkoutId: string): Promise<Order[]> {
  //   // const order: Order = await this.orderRepository.findOne({
  //   //   where: { id },
  //   // });

  //   // if (!order) {
  //   //   throw new HttpException(`Product doesn't exist`, HttpStatus.BAD_REQUEST);
  //   // }

  //   // await this.orderRepository.delete(id);

  //   const ordersToBeDeleted: Order[] = await this.getByCheckout(checkoutId);

  //   ordersToBeDeleted.forEach(async (order) => {
  //     await this.orderRepository.delete(order.id);
  //   })

  //   return ordersToBeDeleted;
  // }


  // deleteOrders(checkoutId:string): void {
  //   this.getByCheckout(checkoutId).then((orders) => {
  //     orders.forEach((order) => {
  //       this.deleteOrder(order.id).then();
  //     });
  //   });
  // }
}
