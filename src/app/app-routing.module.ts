import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductFormComponent } from "./product-form/product-form.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductsResolverService } from "./products-resolver.service";
import { AuthComponent } from "./auth/auth.component";
import { BuyProductComponent } from "./buy-product/buy-product.component";
import { CompleteComponent } from "./complete/complete.component";
import { OrderComponent } from "./order/order.component";
import { OrderresolverResolver } from "./order/orderresolver.resolver";
import { CartPageComponent } from "./cart-page/cart-page.component";
import { AuthGuard } from "./auth/auth.guard";
import { IsWebmasterGuard } from "./auth/is-webmaster.guard";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const appRoutes: Routes = [
  { path: "", redirectTo: "/products", pathMatch: "full" },
  {
    path: "products",
    component: ProductListComponent,
    resolve: [ProductsResolverService],
  },
  {
    path: "create",
    component: ProductFormComponent,
    canActivate: [AuthGuard, IsWebmasterGuard],
  },
  {
    path: "product/:id",
    component: ProductDetailComponent,
    resolve: [ProductsResolverService],
  },
  {
    path: "product/:id/edit",
    component: ProductFormComponent,
    resolve: [ProductsResolverService],
    canActivate: [AuthGuard, IsWebmasterGuard],
  },
  {
    path: "auth",
    component: AuthComponent,
  },
  {
    path: "checkout",
    component: BuyProductComponent,
    resolve: [ProductsResolverService],
    canActivate: [AuthGuard],
  },
  {
    path: "complete",
    component: CompleteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "orders",
    component: OrderComponent,
    resolve: { res2: OrderresolverResolver },
    canActivate: [AuthGuard],
  },
  {
    path: "cart",
    component: CartPageComponent,
    resolve: [ProductsResolverService],
    canActivate: [AuthGuard],
  },
  {
    path: "contactus",
    component: ContactUsComponent,
  },
  {
    path: "aboutus",
    component: AboutusComponent,
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
