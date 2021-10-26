import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerActiveOrdersComponent } from './containers/manager-active-orders/manager-active-orders.component';
import { ManagerFinishedOrdersComponent } from './containers/manager-finished-orders/manager-finished-orders.component';
import { ManagerWaitingOrdersComponent } from './containers/manager-waiting-orders/manager-waiting-orders.component';
import { ManagerGetOrderComponent } from './containers/manager-get-order/manager-get-order.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ManagerActiveOrdersComponent, ManagerFinishedOrdersComponent, ManagerWaitingOrdersComponent, ManagerGetOrderComponent],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class ManagerModule { }
