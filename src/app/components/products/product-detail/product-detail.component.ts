import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "../../../models/product.model";
import { ProductService } from "../../../services/product.service";
import { AuthService } from "../../../services/auth-services/auth.service";
import { Subscription } from "rxjs";
import { NgForm } from "@angular/forms";
import { CartPageService } from "../../../services/cart-page.service";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"],
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  webmaster = false;
  auth = false;
  userSub: Subscription;
  q = 1;

  constructor(
    private aroute: ActivatedRoute,
    private pservice: ProductService,
    private authS: AuthService,
    private cservice: CartPageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.aroute.params.subscribe((params) => {
      this.product = this.pservice.getProducts()[+params["id"]];
    });

    this.userSub = this.authS.User.subscribe((user) => {
      if (!!user) {
        this.webmaster = user.webmaster;
        this.auth = true;
      } else {
        this.webmaster = false;
        this.auth = false;
      }
    });
  }

  onSubmit(f: NgForm) {
    if (!this.auth || this.webmaster) {
      this.authS.logout();
      this.router.navigate(["/auth"]);
      return;
    }
    let quantity = f.value.quantity;
    this.cservice.addToCart(this.product.id, quantity);
    this.router.navigate(["/buying/cart"]);
  }
}
