import { Injectable } from '@angular/core';
import { RestService } from 'src/app/core/services/rest.service';
import { NewOrder } from 'src/app/customer/models/newOrder.model';
import { Observable } from 'rxjs';
import { OrderList } from 'src/app/shared/models/orderList.model';
import { OrderDetails } from 'src/app/shared/models/orderDetails.model';
import { WorkerSelect } from '../models/workersSelect.model';
import { AssignWorker } from '../models/assignWorker.mode';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  constructor(private restService: RestService) { }



  getActiveOrders(): Observable<Array<OrderList>> {
    return this.restService.post<void, Array<OrderList>>('/manager/get_orders_during', null);
  }
  getFinishedOrders(): Observable<Array<OrderList>> {
    return this.restService.post<void, Array<OrderList>>('/manager/get_orders_finished', null);
  }
  getWaitingOrders(): Observable<Array<OrderList>> {
    return this.restService.post<void, Array<OrderList>>('/manager/get_orders_toaccept', null);
  }
  getOrderDetails(orderId: number): Observable<OrderDetails> {
    return this.restService.post<number, OrderDetails>('/manager/get_order_detail/' + orderId, null);
  }
  getWorkersList(): Observable<Array<WorkerSelect>> {
    return this.restService.post<void, Array<WorkerSelect>>('/manager/get_workers', null);
  }
  assignWorker(assign: AssignWorker): Observable<void> {
    return this.restService.post<AssignWorker, void>('/manager/assign_worker', assign);
  }

}
