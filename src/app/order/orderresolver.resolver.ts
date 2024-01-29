import { Injectable } from "@angular/core";
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable, concat, of } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../auth/user.service";
import { User } from "../auth/user.model";
import { exhaustMap, tap } from "rxjs/operators";
import { LoadingService } from "../loading.service";
import { ProductDataService } from "../product-data.service";
import { OrderService } from "./order.service";
import { Cart } from "../cart-page/cart.model";
import { CartPageService } from "../cart-page/cart-page.service";

@Injectable({
  providedIn: "root",
})
export class OrderresolverResolver
  implements Resolve<{ user: User; res: string[] }>
{
  constructor(
    private aservice: AuthService,
    private uservice: UserService,
    private l: LoadingService,
    private dservice: ProductDataService,
    private oservice: OrderService,
    private cservice: CartPageService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{ user: User; res: string[] } | { user: User; res: string[] }> {
    this.l.isLoading.next(true);

    let displayCarts = [];
    let orderTotals = [];

    return this.dservice.getProducts().pipe(
      exhaustMap(() => {
        return this.aservice.User.pipe(
          exhaustMap((user) => {
            if (user) {
              return this.uservice.loadUserOrders(user).pipe(
                exhaustMap((res: string[]) => {
                  if (res) {
                    let obs: Observable<Cart[]>[] = [];
                    console.log(res);

                    for (let i = 0; i < res.length; i++) {
                      obs.push(
                        this.oservice.getOrder(res[i]).pipe(
                          tap((res: Cart[]) => {
                            console.log(res);
                            displayCarts.push(
                              this.cservice.displayCartGetter(res)
                            );
                            orderTotals.push(
                              this.cservice
                                .displayCartGetter(res)
                                .reduce(
                                  (a, p) => a + p.product.price * p.quantity,
                                  0
                                )
                            );
                          })
                        )
                      );
                    }
                    concat(...obs).subscribe();
                    setTimeout(() => {
                      this.l.isLoading.next(false);
                    }, 1000);
                    return of({
                      user: user,
                      res: displayCarts,
                      t: orderTotals,
                    });
                  } else {
                    this.l.isLoading.next(false);
                    return of({ user: user, res: [], t: [] });
                  }
                })
              );
            } else {
              this.l.isLoading.next(false);
              return of({ user: null, res: [], t: [] });
            }
          })
        );
      })
    );
  }
}
