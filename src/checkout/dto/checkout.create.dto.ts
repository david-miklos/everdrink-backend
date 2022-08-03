import { Shipping } from "../shipping.enum";

export class CreateCheckoutDto {
    shipping: Shipping;
    addressId: string;
}