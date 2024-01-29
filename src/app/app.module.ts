import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { ProductsModule } from "./components/products/products.module";
import { MiscellaneousModule } from "./components/miscellaneous/miscellaneous.module";
import { BuyingModule } from "./components/buying/buying.module";
import { AuthModule } from "./components/auth/auth.module";
import { RouterModule } from "@angular/router";
import { SharedModule } from "./components/shared/shared.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    ProductsModule,
    BuyingModule,
    MiscellaneousModule,
    RouterModule.forRoot([]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
