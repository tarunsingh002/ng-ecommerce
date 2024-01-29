import { Cart } from "../cart-page/cart.model";

export class Order {
  constructor(public cart: Cart[], public id?: string) {}
}
