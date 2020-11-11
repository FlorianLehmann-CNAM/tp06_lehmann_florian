import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { Product } from "../../../models/Product";
import { Article } from "../../../models/ShoppingCart";
import { HttpServiceService } from "../../../services/http-service.service";
import { AddProduct } from "../../../store/actions/ShoppingCart.action";

@Component({
  selector: "app-detail-product",
  templateUrl: "./detail-product.component.html",
  styleUrls: ["./detail-product.component.css"]
})
export class DetailProductComponent implements OnInit {
  product: Observable<Product>;

  constructor(
    private httpService: HttpServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    let id: number = Number(this.route.snapshot.paramMap.get("id"));
    this.product = this.httpService.getProductById(id);
    setTimeout(() => {
      this.product.subscribe(value => {
        if (!value) this.noProduct();
      });
    }, 5000);
  }

  noProduct(): void {
    this.router.navigate(["/catalogue"]);
  }

  onAddToShoppingCart(product: Product): void {
    let article: Article = Article.fromProduct(product);
    this.store.dispatch(new AddProduct(article));
  }
}
