import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { User } from '../../../models/User';

@Component({
  selector: 'app-compte-form',
  templateUrl: './compte-form.component.html',
  styleUrls: ['./compte-form.component.css']
})
export class CompteFormComponent implements OnInit {

  @Output('onUserChanged') onFormSubmit = new EventEmitter<Observable<User>>();


  passwordValidator = (control: AbstractControl) : ValidationErrors => {
    if(!control.value)
      return null;

    if(!this.password)
      return null;
    return control.value === this.password.value ? null : ({'invalid': true});
  }

  genderOptions = ['Monsieur', 'Madame'];

  compteForm : FormGroup = this.fb.group({
    name : ['qsd', [Validators.required, this.noNumberValidator]],
    surname: ['qsd', [Validators.required, this.noNumberValidator]],
    address: ['qsd', [Validators.required]],
    postalCode: ['67130', [Validators.required, this.postalCodeValidator]],
    city: ['qsd', [Validators.required, this.noNumberValidator]],
    mobilePhone: ['+33649150933', [Validators.required, this.phoneValidator]],
    mail : ['q@q.qsq', [Validators.required, this.emailValidator]],
    country: ['qsd', [Validators.required, this.noNumberValidator]],
    gender: [this.genderOptions[0]],
    login: ['qsdd', [Validators.required]],
    password: ['qsd', [Validators.required]],
    passwordConfirm: ['', [Validators.required, this.passwordValidator]]
  })

  constructor(private fb : FormBuilder, private httpService: HttpServiceService,) { }

  get name() {return this.compteForm.get('name'); }
  get surname() { return this.compteForm.get('surname');}
  get address() { return this.compteForm.get('address');}
  get postalCode() { return this.compteForm.get('postalCode'); }
  get city() { return this.compteForm.get('city');}
  get mobilePhone() {return this.compteForm.get('mobilePhone');}
  get mail() {return this.compteForm.get('mail');}
  get country() { return this.compteForm.get('country');}
  get gender() {return this.compteForm.get('gender');}
  get login() {return this.compteForm.get('login');}
  get password() {return this.compteForm.get('password');}
  get passwordConfirm() {return this.compteForm.get('passwordConfirm');}

  onSubmit() : void{
    
    let user : User = new User(-1, this.name.value, this.surname.value, this.address.value, this.postalCode.value, this.city.value, this.mobilePhone.value, this.mail.value, this.country.value, this.gender.value, this.login.value, this.password.value);
    console.log("submit", user);
    let obs : Observable<User> = this.httpService.registerUser(user);
    this.onFormSubmit.emit(obs);
  }

  ngOnInit() {
  }
  
  test(){
    console.log(this.compteForm.value);
  }
  // validators
  noNumberValidator(control: AbstractControl) : ValidationErrors{
    const reg : RegExp = /[0-9]/
    if(!control.value)
      return null;

    return !reg.test(control.value) ? null : ({'number': true});
  }

  emailValidator(control: AbstractControl) : ValidationErrors{
    const reg : RegExp = /[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+/
     
    if(!control.value)
      return null;

    return reg.test(control.value) ? null : ({'notAnEmailAddress': true});
  }

  phoneValidator(control: AbstractControl) : ValidationErrors{
    const reg : RegExp = /[0-9]{11}/ // 11: +33 6
    if(!control.value)
      return null;
    
    return reg.test(control.value) ? null : ({'notPhone' : true});
    
  }

  postalCodeValidator(control: AbstractControl) : ValidationErrors{
    const reg : RegExp = /[0-9]{5}/
    if(!control.value)
      return null;

    return reg.test(control.value) ? null : ({'notPostalCode' : true});
  }

  onGenderChanged(event : any) : void{
    console.log("changed");
    this.gender.setValue(event.target.value);
  }
}