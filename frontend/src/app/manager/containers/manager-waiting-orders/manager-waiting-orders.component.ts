import { Component, OnInit } from '@angular/core';
import { OrderList } from 'src/app/shared/models/orderList.model';
import { Router } from '@angular/router';
import { ManagerService } from '../../services/manager.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-manager-waiting-orders',
  templateUrl: './manager-waiting-orders.component.html',
  styleUrls: ['./manager-waiting-orders.component.scss']
})
export class ManagerWaitingOrdersComponent implements OnInit {

  orderlist: OrderList[];
  constructor(private managerService: ManagerService, private router: Router) { }

  ngOnInit() {
    this.getActiveOrders();
  }

  getActiveOrders() {
    this.managerService.getWaitingOrders().pipe(first()).subscribe((result: OrderList[]) => this.orderlist = result );
  }

  GetOrder(orderId: number) {
    this.router.navigate(['/manager/getorder/' + orderId]);
  }

}
