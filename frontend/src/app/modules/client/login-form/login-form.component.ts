import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { UserLoginQueryModel } from 'src/app/models/query/UserLoginQueryModel';
import { User } from 'src/app/models/User';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { SignInUser } from 'src/app/store/actions/User.action';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

    invalidMessage: string = null;
    loginSubscription : Subscription = null;


    passwordValidator = (control: AbstractControl) : ValidationErrors => {
        if(!control.value)
          return null;
    
        if(!this.password)
          return null;
        return control.value === this.password.value ? null : ({'invalid': true});
    }
    
    loginForm : FormGroup = this.fb.group({
        login: ['', [Validators.required]],
        password: ['', [Validators.required]]
    })

    constructor(
        private fb: FormBuilder, 
        private httpService: HttpServiceService,
        private router: Router,
        private store: Store) { }

    get login() {return this.loginForm.get('login');}
    get password() {return this.loginForm.get('password'); }


    ngOnInit(): void {

    }

    ngOnDestroy(): void{

    }

    onSubmit() : void{
        this.invalidMessage = null;
        this.loginSubscription = this.httpService.loginUser(this.login.value, this.password.value)
        .subscribe((userLogin : UserLoginQueryModel) => {
            if(userLogin.success){
                this.store.dispatch(new SignInUser(userLogin.user))
                this.router.navigate(['/home']);
            }
            else
                this.invalidMessage = "Il y a eu un problème de connexion.";
        })       
        
    }

  
}
