import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/register.component';
import { SharedModule } from '../shared/shared.module';
import { RestartpasswordComponent } from './containers/restartpassword/restartpassword.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, RestartpasswordComponent],
  imports: [
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
