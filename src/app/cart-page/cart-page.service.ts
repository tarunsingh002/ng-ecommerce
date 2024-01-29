import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Cart } from "./cart.model";
import { ProductService } from "../product.service";

@Injectable({
  providedIn: "root",
})
export class CartPageService {
  cartChanged = new BehaviorSubject<Cart[]>(null);
  cart: Cart[] = [];

  constructor(private pservice: ProductService) {}

  addToCart(id: string, q: number) {
    this.cart.push({ id: id, quantity: q });
    this.cartChanged.next(this.cart);
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  displayCartGetter(cart: Cart[]) {
    let allProducts = this.pservice.getProducts();
    let displayCart = cart.map((c) => {
      return {
        product: allProducts.find((p) => p.id === c.id),
        quantity: c.quantity,
      };
    });

    return displayCart;
  }

  editCart(cart: Cart[]) {
    this.cart = cart;
    this.cartChanged.next(this.cart);
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }
}
