import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { SignOutUser } from 'src/app/store/actions/User.action';
import { UserState } from 'src/app/store/states/User.state';
import { ShoppingCartState } from "../../store/states/ShoppingCart.state";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent {
  nbProduct$: Observable<number>;
  isUserLogged$: Observable<Boolean>;

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.nbProduct$ = this.store.select(ShoppingCartState.GetProductsNumber);
    this.isUserLogged$ = this.store.select(UserState.IsLogged);
  }

  Disconnect() : void{
      this.store.dispatch(new SignOutUser());
      this.router.navigate(['/home']);

  }
}
