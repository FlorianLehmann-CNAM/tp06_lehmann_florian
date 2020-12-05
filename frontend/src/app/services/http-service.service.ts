import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Product } from '../models/Product';
import { UserLoginQueryModel } from '../models/query/UserLoginQueryModel';
import { User } from '../models/User';

@Injectable({
    providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) { }

  getProductData() : Observable<Product[]>{
    return this.http.get<Product[]>(environment.baseUrl + "/products");
  }

  registerUser(user : User) : Observable<User>{
    return this.http.post<User>(environment.baseUrl + "/user/register", JSON.stringify(user));
  }

  loginUser(login : string, password: string){
      return this.http.get<UserLoginQueryModel>(environment.baseUrl + "/user/login", {params: {login, password}});
  }


  getProductById(id : number) : Observable<Product>{
      return this.getProductData().pipe(
          map((value: Product[]) => value.filter((p : Product) => p.id === id)[0])
      )
  }


}