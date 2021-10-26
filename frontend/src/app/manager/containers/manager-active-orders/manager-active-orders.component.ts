import { Component, OnInit } from '@angular/core';
import { OrderList } from 'src/app/shared/models/orderList.model';
import { CustomerService } from 'src/app/customer/services/customer.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-manager-active-orders',
  templateUrl: './manager-active-orders.component.html',
  styleUrls: ['./manager-active-orders.component.scss']
})
export class ManagerActiveOrdersComponent implements OnInit {

  orderlist: OrderList[];
  constructor(private managerService: ManagerService, private router: Router) { }

  ngOnInit() {
    this.getActiveOrders();
  }

  getActiveOrders() {
    this.managerService.getActiveOrders().pipe(first()).subscribe((result: OrderList[]) => this.orderlist = result );
  }

  GetOrder(orderId: number) {
    this.router.navigate(['/manager/getorder/' + orderId]);
  }

}
