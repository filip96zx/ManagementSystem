import { Component, OnInit } from '@angular/core';
import { OrderList } from 'src/app/shared/models/orderList.model';
import { WorkerService } from '../../services/worker.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-worker-finished-orders',
  templateUrl: './worker-finished-orders.component.html',
  styleUrls: ['./worker-finished-orders.component.scss']
})
export class WorkerFinishedOrdersComponent implements OnInit {

  orderlist: OrderList[];
  constructor(private workerService: WorkerService, private router: Router) { }

  ngOnInit() {
    this.getActiveOrders();
  }

  getActiveOrders() {
    this.workerService.getFinishedOrders().pipe(first()).subscribe((result: OrderList[]) => this.orderlist = result );
  }

  GetOrder(orderId: number) {
    this.router.navigate(['/worker/getorder/' + orderId]);
  }

}
