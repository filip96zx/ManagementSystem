import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditprofileComponent } from './containers/editprofile/editprofile.component';
import { ChangepasswordComponent } from './containers/changepassword/changepassword.component';


const routes: Routes = [
  { path: 'editprofile', component : EditprofileComponent},
  { path: 'changepassword', component : ChangepasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilemanagerRoutingModule { }
