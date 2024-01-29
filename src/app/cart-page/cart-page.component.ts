import { Component, OnDestroy, OnInit } from "@angular/core";
import { Cart } from "./cart.model";
import { CartPageService } from "./cart-page.service";
import { Product } from "../product.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-cart-page",
  templateUrl: "./cart-page.component.html",
  styleUrls: ["./cart-page.component.css"],
})
export class CartPageComponent implements OnInit, OnDestroy {
  cart: Cart[];
  displayCart: { product: Product; quantity: number }[];
  cartTotal: number;
  cartSub: Subscription;

  constructor(private cservice: CartPageService) {}

  ngOnInit(): void {
    this.cartSub = this.cservice.cartChanged.subscribe((cart) => {
      if (!localStorage.getItem("cart") && !cart) {
        this.cart = [];
        this.displayCart = [];
      } else if (localStorage.getItem("cart") && !cart) {
        this.cart = JSON.parse(localStorage.getItem("cart"));
        this.displayCart = this.cservice.displayCartGetter(this.cart);
      } else if (!localStorage.getItem("cart") && cart) {
        this.cart = cart;
        this.displayCart = this.cservice.displayCartGetter(this.cart);
      } else if (localStorage.getItem("cart") && cart) {
        this.cart = cart;
        this.displayCart = this.cservice.displayCartGetter(this.cart);
      }

      let t: number = 0;

      for (let i = 0; i < this.displayCart.length; i++)
        t += this.displayCart[i].product.price * this.displayCart[i].quantity;

      this.cartTotal = t;
    });
  }

  addProduct(p: { product: Product; quantity: number }) {
    let i = this.displayCart.findIndex((pd) => pd.product.id === p.product.id);
    this.displayCart[i].quantity++;
    this.cart[i].quantity++;
    this.cservice.editCart(this.cart);
  }

  subtractProduct(p: { product: Product; quantity: number }) {
    let i = this.displayCart.findIndex((pd) => pd.product.id === p.product.id);
    this.displayCart[i].quantity--;
    this.cart[i].quantity--;
    if (this.displayCart[i].quantity === 0) {
      this.displayCart.splice(i, 1);
      this.cart.splice(i, 1);
    }
    this.cservice.editCart(this.cart);
  }

  ngOnDestroy(): void {
    this.cartSub.unsubscribe();
  }
}
