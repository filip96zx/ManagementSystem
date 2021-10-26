import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { OrderDetails } from 'src/app/shared/models/orderDetails.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customer-get-order',
  templateUrl: './customer-get-order.component.html',
  styleUrls: ['./customer-get-order.component.scss']
})
export class CustomerGetOrderComponent implements OnInit {

  orderdetail = new OrderDetails();

  constructor(private customerService: CustomerService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.GetOrderDetail(this.route.snapshot.params.id);
  }

  GetOrderDetail(orderId: number) {
    this.customerService.getOrderDetails(orderId).pipe(first()).subscribe(result => this.orderdetail = result);
  }
  GoBack() {
    this.location.back();
  }
}
