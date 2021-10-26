import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkerRoutingModule } from './worker-routing.module';
import { WorkerActiveOrdersComponent } from './containers/worker-active-orders/worker-active-orders.component';
import { WorkerFinishedOrdersComponent } from './containers/worker-finished-orders/worker-finished-orders.component';
import { WorkerGetOrderComponent } from './containers/worker-get-order/worker-get-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkerCustomerDetailsComponent } from './containers/worker-customer-details/worker-customer-details.component';


@NgModule({
  declarations: [WorkerActiveOrdersComponent, WorkerFinishedOrdersComponent, WorkerGetOrderComponent, WorkerCustomerDetailsComponent],
  imports: [
    CommonModule,
    WorkerRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class WorkerModule { }
