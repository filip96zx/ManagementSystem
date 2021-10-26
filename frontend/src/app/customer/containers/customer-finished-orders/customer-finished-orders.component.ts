import { Component, OnInit } from '@angular/core';
import { OrderList } from 'src/app/shared/models/orderList.model';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-customer-finished-orders',
  templateUrl: './customer-finished-orders.component.html',
  styleUrls: ['./customer-finished-orders.component.scss']
})
export class CustomerFinishedOrdersComponent implements OnInit {

  orderlist: OrderList[];
  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit() {
    this.getActiveOrders();
  }

  getActiveOrders() {
    this.customerService.getFinishedOrders().pipe(first()).subscribe((result: OrderList[]) => this.orderlist = result );
  }

  GetOrder(orderId: number) {
    this.router.navigate(['/customer/getorder/' + orderId]);
  }

}
