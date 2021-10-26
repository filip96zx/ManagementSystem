import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkerActiveOrdersComponent } from './containers/worker-active-orders/worker-active-orders.component';
import { WorkerFinishedOrdersComponent } from './containers/worker-finished-orders/worker-finished-orders.component';
import { WorkerGetOrderComponent } from './containers/worker-get-order/worker-get-order.component';
import { WorkerCustomerDetailsComponent } from './containers/worker-customer-details/worker-customer-details.component';


const routes: Routes = [
  { path: 'activeorders', component: WorkerActiveOrdersComponent },
  { path: 'finishedorders', component:  WorkerFinishedOrdersComponent },
  { path: 'getorder/:id', component: WorkerGetOrderComponent },
  { path: 'getcustomer/:id', component: WorkerCustomerDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkerRoutingModule { }
