import { Component, OnInit } from '@angular/core';
import { CustomerDetails } from '../../models/customerDetails.model';
import { WorkerService } from '../../services/worker.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-worker-customer-details',
  templateUrl: './worker-customer-details.component.html',
  styleUrls: ['./worker-customer-details.component.scss']
})
export class WorkerCustomerDetailsComponent implements OnInit {

  customerDetail = new CustomerDetails();

  constructor(private workerService: WorkerService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.getCustomerDetail(this.route.snapshot.params.id);
  }

  getCustomerDetail(orderId: number) {
    console.log(orderId);
    this.workerService.getCustomerDetail(orderId).pipe(first()).subscribe(result => this.customerDetail = result);
  }
  GoBack() {
    this.location.back();
  }

}
