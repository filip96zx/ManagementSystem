import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './containers/homepage/homepage.component';
import { ContactpageComponent } from './containers/contactpage/contactpage.component';


// import { IsAuthGuard } from './guards/is-auth.guard';
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './../auth/auth.module#AuthModule'
  },
  {
    path: 'admin',
    loadChildren: './../admin/admin.module#AdminModule'
  },
  {
    path: 'profilemanager',
    loadChildren: './../profilemanager/profilemanager.module#ProfilemanagerModule'
  },
  {
    path: 'customer',
    loadChildren: './../customer/customer.module#CustomerModule'
  },
  {
    path: 'manager',
    loadChildren: './../manager/manager.module#ManagerModule'
  },
  {
    path: 'worker',
    loadChildren: './../worker/worker.module#WorkerModule'
  },
  {
    path: 'home', component: HomepageComponent
  },
  {
    path: 'contact', component: ContactpageComponent
  },
//   {
//     path: 'app',
//     loadChildren: './containers/app/app.module#AppModule'
//   },
//   {
//     path: 'user',
//     loadChildren: './../user/user.module#UserModule',
//     //canActivate:[IsAuthGuard]
//   },
//   {
//     path: '',
//     redirectTo: 'app',
//     pathMatch: 'full'
//   },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
