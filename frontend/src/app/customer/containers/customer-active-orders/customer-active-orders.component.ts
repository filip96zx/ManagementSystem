import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { OrderList } from 'src/app/shared/models/orderList.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-customer-active-orders',
  templateUrl: './customer-active-orders.component.html',
  styleUrls: ['./customer-active-orders.component.scss']
})
export class CustomerActiveOrdersComponent implements OnInit {

  orderlist: OrderList[];
  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit() {
    this.getActiveOrders();
  }

  getActiveOrders() {
    this.customerService.getActiveOrders().pipe(first()).subscribe((result: OrderList[]) => this.orderlist = result );
  }

  GetOrder(orderId: number) {
    this.router.navigate(['/customer/getorder/' + orderId]);
  }

}
