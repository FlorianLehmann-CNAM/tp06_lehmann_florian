import { Component } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { ShoppingCartState } from "../../store/states/ShoppingCart.state";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent {
  nbProduct$: Observable<number>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.nbProduct$ = this.store.select(ShoppingCartState.GetProductsNumber);
  }
}
