import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerActiveOrdersComponent } from './containers/customer-active-orders/customer-active-orders.component';
import { CustomerFinishedOrdersComponent } from './containers/customer-finished-orders/customer-finished-orders.component';
import { CreateorderComponent } from './containers/createorder/createorder.component';
import { CustomerGetOrderComponent } from './containers/customer-get-order/customer-get-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CustomerActiveOrdersComponent, CustomerFinishedOrdersComponent, CreateorderComponent, CustomerGetOrderComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CustomerModule { }
