import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { Observable, of, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NewJwt, SignOutUser } from '../store/actions/User.action';
import { UserState } from '../store/states/User.state';



@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor{
    
    token : string = "";

    constructor(private router: Router, private store: Store, private actions$: Actions){
        this.actions$.pipe(ofActionDispatched(NewJwt)).subscribe(({ payload }) => { 
            this.token = payload;console.log ("jwtToken modifié : " + this.token);} 
        );
        this.actions$.pipe(ofActionDispatched(SignOutUser)).subscribe(({payload}) => {
            this.token = "";
        })
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

        console.log("intercept");
        if(this.token != ""){
            req = req.clone({setHeaders:{ Authorization : `Bearer ${this.token}`}})
            console.log("req changed with headers", req);
        }

        return next.handle(req).pipe(tap(
            (evt: HttpEvent<any>) => {
                if(evt instanceof HttpResponse){
                    let authorization = evt.headers.get("Authorization");
                    if(authorization != null){
                        let tab = authorization.split(/Bearer\s+(.*)$/i);
                        if(tab.length > 1){
                            this.store.dispatch(new NewJwt(tab[1]));
                        }
                    }
                }
            },
            (error: HttpErrorResponse) => {
                switch(error.status){
                    case 401:
                        this.store.dispatch(new NewJwt(""));
                        console.log("Error 401");
                        this.router.navigate['/client/login']
                        break;
                }
                return of(null);
            } 
        ));
    }
}