import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Product } from "../../../models/Product";
import { HttpServiceService } from "../../../services/http-service.service";
import { of } from "rxjs";
import { Store } from "@ngxs/store";
import { AddProduct } from "../../../store/actions/ShoppingCart.action";
import { Article } from "../../../models/ShoppingCart";
import { Router } from "@angular/router";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  productsObservable: Observable<Product[]>;

  displayProducts: Observable<Product[]>;

  constructor(
    private httpService: HttpServiceService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit() {
    this.productsObservable = this.httpService.getProductData();
    this.displayProducts = this.productsObservable;
  }

  onFilteredData(event: Observable<Product[]>): void {
    this.displayProducts = event;
  }

  addProductToShopppingCart(product: Product): void {
    let article: Article = Article.fromProduct(product);
    this.store.dispatch(new AddProduct(article));
  }

  onCardClicked(product: Product): void {
    this.router.navigate(["catalogue/" + product.id]);
  }
}
