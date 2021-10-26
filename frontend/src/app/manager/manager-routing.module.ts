import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagerActiveOrdersComponent } from './containers/manager-active-orders/manager-active-orders.component';
import { ManagerFinishedOrdersComponent } from './containers/manager-finished-orders/manager-finished-orders.component';
import { ManagerWaitingOrdersComponent } from './containers/manager-waiting-orders/manager-waiting-orders.component';
import { ManagerGetOrderComponent } from './containers/manager-get-order/manager-get-order.component';


const routes: Routes = [
  { path: 'activeorders', component: ManagerActiveOrdersComponent },
  { path: 'finishedorders', component: ManagerFinishedOrdersComponent },
  { path: 'waitingorders', component: ManagerWaitingOrdersComponent},
  { path: 'getorder/:id', component: ManagerGetOrderComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
