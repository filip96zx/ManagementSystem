import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerActiveOrdersComponent } from '../customer/containers/customer-active-orders/customer-active-orders.component';
import { CustomerFinishedOrdersComponent } from '../customer/containers/customer-finished-orders/customer-finished-orders.component';
import { CustomerGetOrderComponent } from '../customer/containers/customer-get-order/customer-get-order.component';
import { CreateorderComponent } from '../customer/containers/createorder/createorder.component';


const routes: Routes = [
  { path: 'activeorders', component: CustomerActiveOrdersComponent },
  { path: 'finishedorders', component: CustomerFinishedOrdersComponent },
  { path: 'getorder/:id', component: CustomerGetOrderComponent },
  { path: 'createorder', component: CreateorderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
