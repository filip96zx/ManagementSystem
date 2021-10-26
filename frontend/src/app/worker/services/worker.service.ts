import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RestService } from 'src/app/core/services/rest.service';
import { OrderList } from 'src/app/shared/models/orderList.model';
import { OrderDetails } from 'src/app/shared/models/orderDetails.model';
import { WorkerSelect } from 'src/app/manager/models/workersSelect.model';
import { AssignWorker } from 'src/app/manager/models/assignWorker.mode';
import { UpdateStatus } from '../models/updateStatus.model';
import { CustomerDetails } from '../models/customerDetails.model';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  constructor(private restService: RestService) { }

  getActiveOrders(): Observable<Array<OrderList>> {
    return this.restService.post<void, Array<OrderList>>('/worker/get_orders_notfinished', null);
  }
  getFinishedOrders(): Observable<Array<OrderList>> {
    return this.restService.post<void, Array<OrderList>>('/worker/get_orders_finished', null);
  }

  getOrderDetails(orderId: number): Observable<OrderDetails> {
    return this.restService.post<number, OrderDetails>('/worker/get_order_detail/' + orderId, null);
  }
  UpdateStatus(status: UpdateStatus): Observable<Array<WorkerSelect>> {
    return this.restService.post<UpdateStatus, Array<WorkerSelect>>('/worker/update_status', status);
  }
  FinishOrder(order: number): Observable<void> {
    return this.restService.post<number, void>('/worker/finish_order', order);
  }
  getCustomerDetail(cutomerid: number): Observable<CustomerDetails> {
    return this.restService.post<number, CustomerDetails>('/worker/get_customer_details/' + cutomerid, null);
  }

}
