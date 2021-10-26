import { Component, OnInit } from '@angular/core';
import { OrderList } from 'src/app/shared/models/orderList.model';
import { ManagerService } from '../../services/manager.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-manager-finished-orders',
  templateUrl: './manager-finished-orders.component.html',
  styleUrls: ['./manager-finished-orders.component.scss']
})
export class ManagerFinishedOrdersComponent implements OnInit {

  orderlist: OrderList[];
  constructor(private managerService: ManagerService, private router: Router) { }

  ngOnInit() {
    this.getActiveOrders();
  }

  getActiveOrders() {
    this.managerService.getFinishedOrders().pipe(first()).subscribe((result: OrderList[]) => this.orderlist = result );
  }

  GetOrder(orderId: number) {
    this.router.navigate(['/manager/getorder/' + orderId]);
  }

}
