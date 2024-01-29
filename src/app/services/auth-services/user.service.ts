import { Injectable } from "@angular/core";

import { User } from "../../models/user.model";
import { HttpClient } from "@angular/common/http";
import { exhaustMap, map } from "rxjs/operators";
import { Cart } from "../../models/cart.model";
import { Order } from "../../models/order.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  users: User[] = [];

  api: string = "https://ng-ecommerce-electronics-default-rtdb.firebaseio.com/";
  constructor(private http: HttpClient) {}

  createUser(user: User) {
    return this.http.post<{ name: string }>(`${this.api}/users.json`, user);
  }

  createOrder(cart: Cart[], user: User) {
    // user.products.push(product.id);
    return this.http
      .post<{ name: string }>(`${this.api}/orders.json`, cart)
      .pipe(
        exhaustMap((res) => {
          let o = new Order(cart, res.name);
          user.orders.push(res.name);
          localStorage.setItem("userData", JSON.stringify(user));
          return this.http.patch(`${this.api}/users/${user.rtdid}.json`, user);
        })
      );
  }

  loadUserOrders(user: User) {
    return this.http.get(`${this.api}/users/${user.rtdid}/orders.json`);
  }

  loadUsers() {
    return this.http.get(`${this.api}/users.json`).pipe(
      map((res) => {
        for (let id in res) {
          if (res.hasOwnProperty(id))
            this.users.push({ ...res[id], rtdid: id });
        }
        return this.users;
      })
    );
  }
}
