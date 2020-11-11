import { Component, OnInit } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable, of } from "rxjs";
import { filter, map } from "rxjs/operators";
import {
  ClearShoppingCart,
  DelProduct,
  ModifyQuantity
} from "../../../store/actions/ShoppingCart.action";
import { Product } from "../../../models/Product";
import { Article } from "../../../models/ShoppingCart";
import { ShoppingCartState } from "../../../store/states/ShoppingCart.state";

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.css"]
})
export class ShoppingCartComponent implements OnInit {
  products$: Observable<Article[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.products$ = this.store.select(ShoppingCartState.GetProducts);
  }

  getTotalPriceFromProduct(product: Article): number {
    return product.price * product.quantity;
  }

  getShoppingCartTotalPrice(): Observable<number> {
    return this.products$.pipe(
      map((value: Article[]) =>
        value
          .map((p: Article) => p.quantity * p.price)
          .reduce((acc, value) => acc + value, 0)
      )
    );
  }

  clearShoppingCart(): void {
    this.store.dispatch(new ClearShoppingCart());
  }

  deleteProduct(product: Article): void {
    this.store.dispatch(new DelProduct(product));
  }

  onQuantityChanged(product: Article, newQuantity: Event) {
    this.store.dispatch(
      new ModifyQuantity(
        product,
        Number((newQuantity.target as HTMLInputElement).value)
      )
    );
  }
}
