import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";
import { map, tap } from "rxjs/operators";
import { ProductService } from "./product.service";

@Injectable({
  providedIn: "root",
})
export class ProductDataService {
  api: string = "https://ng-ecommerce-electronics-default-rtdb.firebaseio.com/";
  constructor(private http: HttpClient, private pservice: ProductService) {}

  addProduct(p: Product) {
    return this.http.post<{ name: string }>(`${this.api}/products.json`, p);
  }

  getProducts() {
    return this.http.get(`${this.api}/products.json`).pipe(
      map((response) => {
        let products: Product[] = [];
        for (let id in response) {
          if (response.hasOwnProperty(id))
            products.push({ ...response[id], id: id });
        }
        this.pservice.addProducts(products);
        return products;
      })
    );
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.api}/products/${id}.json`);
  }

  updateProduct(id: string, product: Product) {
    return this.http.patch(`${this.api}/products/${id}.json`, product);
  }
}
