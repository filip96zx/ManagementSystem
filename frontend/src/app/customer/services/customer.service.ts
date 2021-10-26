import { Injectable } from '@angular/core';
import { RestService } from 'src/app/core/services/rest.service';
import { Observable } from 'rxjs';
import { NewOrder } from '../models/newOrder.model';
import { OrderList } from 'src/app/shared/models/orderList.model';
import { OrderDetails } from 'src/app/shared/models/orderDetails.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private restService: RestService) { }


  newOffer(description: NewOrder): Observable<void> {
    return this.restService.post<NewOrder, void>('/customer/order_create', description);
  }

  getActiveOrders(): Observable<Array<OrderList>> {
    return this.restService.post<void, Array<OrderList>>('/customer/order_list_notfinished', null);
  }
  getFinishedOrders(): Observable<Array<OrderList>> {
    return this.restService.post<void, Array<OrderList>>('/customer/order_list_finished', null);
  }
  getOrderDetails(orderId: number): Observable<OrderDetails> {
    return this.restService.post<number, OrderDetails>('/customer/get_order_detail/' + orderId, null);
  }

}
