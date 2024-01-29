import { Component, OnDestroy, OnInit } from "@angular/core";
import { Product } from "../product.model";
import { ProductService } from "../product.service";
import { ProductDataService } from "../product-data.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { CartPageService } from "../cart-page/cart-page.service";
import { Router } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  auth: boolean = false;
  authSub: Subscription;
  webmaster: boolean = false;
  reactiveForm: FormGroup;
  constructor(
    private pservice: ProductService,
    private dservice: ProductDataService,
    private authS: AuthService,
    private cservice: CartPageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.products = this.pservice.getProducts();
    this.pservice.searchedProductsChanged.subscribe((p) => {
      this.products = p;
    });

    this.authSub = this.authS.User.subscribe((user) => {
      this.auth = !!user;
      if (user) this.webmaster = user.webmaster;
    });
  }

  onDelete(index: number) {
    if (confirm("Are you sure you want to delete this product ?"))
      this.dservice.deleteProduct(this.products[index].id).subscribe(() => {
        this.pservice.deleteProduct(index);
      });
  }

  addToCart(p: Product) {
    this.cservice.addToCart(p.id, 1);
    this.router.navigate(["/cart"]);
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
