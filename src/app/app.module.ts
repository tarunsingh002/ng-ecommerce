import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductFormComponent } from "./product-form/product-form.component";
import { AppRoutingModule } from "./app-routing.module";
import { AuthComponent } from "./auth/auth.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { BuyProductComponent } from "./buy-product/buy-product.component";
import { CompleteComponent } from "./complete/complete.component";
import { OrderComponent } from "./order/order.component";
import { CartPageComponent } from "./cart-page/cart-page.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { SearchComponent } from "./search/search.component";

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductFormComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    BuyProductComponent,
    CompleteComponent,
    OrderComponent,
    CartPageComponent,
    AboutusComponent,
    ContactUsComponent,
    PageNotFoundComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
