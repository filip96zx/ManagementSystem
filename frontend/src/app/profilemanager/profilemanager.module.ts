import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilemanagerRoutingModule } from './profilemanager-routing.module';
import { ChangepasswordComponent } from './containers/changepassword/changepassword.component';
import { EditprofileComponent } from './containers/editprofile/editprofile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ChangepasswordComponent, EditprofileComponent],
  imports: [
    CommonModule,
    ProfilemanagerRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProfilemanagerModule { }
