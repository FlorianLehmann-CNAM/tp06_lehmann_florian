import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AddProduct, ClearShoppingCart, DelProduct, ModifyQuantity } from '../actions/ShoppingCart.action';
import { Product } from '../../models/Product';
import { Article, ShoppingCart } from '../../models/ShoppingCart';
import { Injectable } from '@angular/core';


@State<ShoppingCart>({
    name: 'shoppingCart',
    defaults: {
        products: []
    }
})
@Injectable()
export class ShoppingCartState{

    @Selector()
    static GetProducts(state: ShoppingCart) : Article[]{
        return state.products;
    }

    @Selector()
    static GetProductsNumber(state: ShoppingCart) : number{
        let number = 0;
        state.products.forEach((p) =>{
            number += p.quantity || 1
        })
        return number;
    }
    

    @Action(AddProduct)
    add({getState, patchState} : StateContext<ShoppingCart>, {payload} : AddProduct){
        
        const state : ShoppingCart = getState();
        let foundProductIndex : number = state.products.findIndex((p) => p.title.toLowerCase() == payload.title.toLowerCase());
        if(foundProductIndex > -1){
           
            state.products[foundProductIndex].quantity += 1;
            
        }
        else{
            payload.quantity = 1;
            state.products = [...state.products, payload];
        }
        
        
        patchState({
            products: [...state.products]
        })
    }

    @Action(DelProduct)
    delete({getState, patchState} : StateContext<ShoppingCart>, {payload} : DelProduct){
        const state : ShoppingCart = getState();
        let foundProductIndex : number = state.products.findIndex((p) => p.title.toLowerCase() == payload.title.toLowerCase());
       
        patchState({
            products: [...state.products.filter((p, i) => i != foundProductIndex)]
        });
        return;
    }

    @Action(ClearShoppingCart)
    clear({getState, patchState} : StateContext<ShoppingCart>){
        const state : ShoppingCart = getState();

        state.products = [];
        patchState({
            products: [...state.products]
        });
    }

    @Action(ModifyQuantity)
    modifyQuantity({getState, patchState} : StateContext<ShoppingCart>, {payload, newQuantity} : ModifyQuantity){
        const state: ShoppingCart = getState();

        let index = state.products.findIndex((p) => p.id == payload.id)
        console.log(index);
        if(index > -1){
            
            state.products[index].quantity = newQuantity;
            patchState({
                products: [...state.products]
            });
        }
    }
}