import { Component, OnInit } from '@angular/core';
import { OrderDetails } from 'src/app/shared/models/orderDetails.model';
import { ActivatedRoute } from '@angular/router';
import { first, take } from 'rxjs/operators';
import { Location } from '@angular/common';
import { ManagerService } from '../../services/manager.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkerSelect } from '../../models/workersSelect.model';
import { AssignWorker } from '../../models/assignWorker.mode';

@Component({
  selector: 'app-manager-get-order',
  templateUrl: './manager-get-order.component.html',
  styleUrls: ['./manager-get-order.component.scss']
})
export class ManagerGetOrderComponent implements OnInit {

  orderdetail = new OrderDetails();
  assignWorker: FormGroup;
  workerlist: WorkerSelect[];
  worker = new AssignWorker();

  constructor(private managerService: ManagerService, private route: ActivatedRoute, private location: Location,
              private fbuilder: FormBuilder) { }

  ngOnInit() {
    this.assignWorker = this.fbuilder.group({
      workerId: ['', Validators.required],
      Price: ['', Validators.required]
    });
    this.GetOrderDetail(this.route.snapshot.params.id);
  }

  GetOrderDetail(orderId: number) {
    this.managerService.getOrderDetails(orderId).pipe(first()).subscribe(result => this.orderdetail = result);
  }
  GoBack() {
    this.location.back();
  }

  GetWorkerList() {
    this.managerService.getWorkersList().pipe(first()).subscribe(result => this.workerlist = result);
  }

  onSubmit() {
    // tslint:disable: radix
    this.worker.workerId = parseInt(this.assignWorker.controls.workerId.value);
    this.worker.orderId = parseInt(this.route.snapshot.params.id);
    this.worker.price = this.assignWorker.controls.Price.value;
    this.managerService.assignWorker(this.worker).pipe(first()).subscribe();

  }

}
