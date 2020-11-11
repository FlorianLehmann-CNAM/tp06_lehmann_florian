import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientComponent } from "./client/client.component";
import { CompteFormComponent } from "./compte-form/compte-form.component";
import { RecapComponent } from "./recap/recap.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatchDirective } from "../../directives/Match.directive";
import { FormatPhonePipe } from "../../pipes/formatPhone.pipe";
import { ClientComponentRoutingModule } from "./client-routing.module";
import { CustomValidatorModule } from "../customValidatorModule";
import { HttpServiceService } from 'src/app/services/http-service.service';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [
    ClientComponent,
    CompteFormComponent,
    RecapComponent,
    MatchDirective,
    FormatPhonePipe,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomValidatorModule,
    ClientComponentRoutingModule
  ],
  providers: [HttpServiceService]
})
export class ClientModule {}
