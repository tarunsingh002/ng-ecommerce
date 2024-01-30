import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";

import { MiscellaneousModule } from "./components/miscellaneous/miscellaneous.module";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "./components/shared/shared.module";

const routes: Routes = [
  { path: "", redirectTo: "/products", pathMatch: "full" },
  {
    path: "auth",
    loadChildren: () =>
      import("./components/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "products",
    loadChildren: () =>
      import("./components/products/products.module").then(
        (m) => m.ProductsModule
      ),
  },
  {
    path: "buying",
    loadChildren: () =>
      import("./components/buying/buying.module").then((m) => m.BuyingModule),
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    SharedModule,
    // MiscellaneousModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
