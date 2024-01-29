import { Injectable } from "@angular/core";
import { ProductDataService } from "./product-data.service";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Product } from "./product.model";
import { Observable } from "rxjs";
import { ProductService } from "./product.service";
import { tap } from "rxjs/operators";
import { LoadingService } from "./loading.service";

@Injectable({
  providedIn: "root",
})
export class ProductsResolverService implements Resolve<Product[]> {
  constructor(
    private dservice: ProductDataService,
    private pservice: ProductService,
    private l: LoadingService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Product[] | Observable<Product[]> | Promise<Product[]> {
    this.l.isLoading.next(true);
    return this.dservice.getProducts().pipe(
      tap(() => {
        this.l.isLoading.next(false);
      })
    );
  }
}
