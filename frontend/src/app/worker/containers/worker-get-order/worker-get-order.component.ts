import { Component, OnInit } from '@angular/core';
import { OrderDetails } from 'src/app/shared/models/orderDetails.model';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { WorkerService } from '../../services/worker.service';
import { Location } from '@angular/common';
import { UpdateStatus } from '../../models/updateStatus.model';


@Component({
  selector: 'app-worker-get-order',
  templateUrl: './worker-get-order.component.html',
  styleUrls: ['./worker-get-order.component.scss']
})
export class WorkerGetOrderComponent implements OnInit {

  orderdetail = new OrderDetails();
  updatestatus = new UpdateStatus();

  constructor(private workerService: WorkerService, private route: ActivatedRoute, private location: Location, private router: Router) { }

  ngOnInit() {
    this.GetOrderDetail(this.route.snapshot.params.id);
  }

  GetOrderDetail(orderId: number) {
    this.workerService.getOrderDetails(orderId).pipe(first()).subscribe(result => this.orderdetail = result);
  }
  GoBack() {
    this.location.back();
  }

  AddStatus() {
    if (this.updatestatus.status != null && this.updatestatus.status !== '') {
      // tslint:disable: radix
      this.updatestatus.orderId = parseInt(this.route.snapshot.params.id);
      this.workerService.UpdateStatus(this.updatestatus).pipe(first()).subscribe();
    }
  }

  FinishOrder() {
    this.workerService.FinishOrder(parseInt(this.route.snapshot.params.id)).pipe(first()).subscribe();
  }

  GetCustomerDetails() {
    this.router.navigate(['worker/getcustomer/' + parseInt(this.route.snapshot.params.id)]);
  }

}
