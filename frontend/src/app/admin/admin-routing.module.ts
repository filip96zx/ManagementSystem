import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserEditComponent } from '../admin/containers/user-edit/user-edit.component';
import { UserListComponent } from '../admin/containers/user-list/user-list.component';



const routes: Routes = [
  { path: 'useredit/:id', component: UserEditComponent },
  { path: 'userlist', component: UserListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
