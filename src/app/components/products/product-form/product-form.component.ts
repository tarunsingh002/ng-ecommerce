import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { Product } from "../../../models/product.model";
import { ProductService } from "../../../services/product.service";
import { ProductDataService } from "../../../services/product-data.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { LoadingService } from "../../../services/loading.service";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"],
})
export class ProductFormComponent implements OnInit {
  editMode = false;
  id: string;
  reactiveForm: FormGroup;

  constructor(
    private pservice: ProductService,
    private dservice: ProductDataService,
    private aroute: ActivatedRoute,
    private route: Router,
    private l: LoadingService
  ) {}

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      brand: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      url: new FormControl(null, Validators.required),
      specification: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
    });

    this.aroute.params.subscribe((params: Params) => {
      if (params["id"] != null) {
        this.editMode = true;
        this.dservice.getProducts().subscribe(() => {
          let editProduct = this.pservice.getProducts()[+params["id"]];
          this.reactiveForm.setValue({
            name: editProduct.name,
            brand: editProduct.brand ? editProduct.brand : "",
            category: editProduct.category ? editProduct.category : "",
            description: editProduct.description,
            url: editProduct.url,
            specification: editProduct.specification,
            price: editProduct.price,
          });
          this.id = editProduct.id;
        });
      }
    });
  }

  onSubmit(rf: FormGroup) {
    let value = rf.value;
    let product = new Product(
      value.name,
      value.brand,
      value.category,
      value.description,
      value.url,
      value.specification,
      value.price
    );

    rf.reset();

    this.l.isLoading.next(true);
    if (this.editMode) {
      this.dservice.updateProduct(this.id, product).subscribe(() => {
        this.l.isLoading.next(false);
        this.route.navigate(["products"]);
      });
    } else {
      this.dservice.addProduct(product).subscribe((response) => {
        product.id = response.name;
        this.pservice.addProduct(product);
        this.l.isLoading.next(false);
        this.route.navigate(["products"]);
      });
    }
  }
}
