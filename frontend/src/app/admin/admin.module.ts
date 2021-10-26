import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UserListComponent } from './containers/user-list/user-list.component';
import { UserEditComponent } from './containers/user-edit/user-edit.component';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserListComponent, UserEditComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
