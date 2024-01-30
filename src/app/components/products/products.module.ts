import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductFormComponent } from "./product-form/product-form.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { SearchComponent } from "./search/search.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { ProductsResolverService } from "src/app/services/products-resolver.service";
import { IsWebmasterGuard } from "src/app/services/auth-services/is-webmaster.guard";
import { AuthGuard } from "src/app/services/auth-services/auth.guard";

const appRoutes: Routes = [
  {
    path: "",
    component: ProductListComponent,
    resolve: [ProductsResolverService],
  },
  {
    path: "create",
    component: ProductFormComponent,
    canActivate: [AuthGuard, IsWebmasterGuard],
  },
  {
    path: ":id",
    component: ProductDetailComponent,
    resolve: [ProductsResolverService],
  },
  {
    path: ":id/edit",
    component: ProductFormComponent,
    resolve: [ProductsResolverService],
    canActivate: [AuthGuard, IsWebmasterGuard],
  },
];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductFormComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(appRoutes),
  ],
})
export class ProductsModule {}
