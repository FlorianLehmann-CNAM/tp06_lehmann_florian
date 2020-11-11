import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingCarteComponentRoutineModule } from './shopping-cart-routing.module';



@NgModule({
  declarations: [ShoppingCartComponent],
  imports: [
    CommonModule,
    ShoppingCarteComponentRoutineModule
  ]

})
export class ShoppingCartModule { }
