import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { first } from 'rxjs/operators';
import { NewOrder } from '../../models/newOrder.model';

@Component({
  selector: 'app-createorder',
  templateUrl: './createorder.component.html',
  styleUrls: ['./createorder.component.scss']
})
export class CreateorderComponent implements OnInit {

  orderForm: FormGroup;
  orderdescription: string;
  order = new NewOrder();

  constructor(private fbuilder: FormBuilder, private customerService: CustomerService) { }

  ngOnInit() {
    this.orderForm = this.fbuilder.group({
      option1: [''],
      option2: [''],
      option3: [''],
      option4: [''],
      details: ['', Validators.required]
    });
  }

  onSubmit() {
    this.orderdescription = '';
    if (this.orderForm.controls.option1.value === true) {
      this.orderdescription += 'Serwis\n';
    }
    if (this.orderForm.controls.option2.value === true) {
      this.orderdescription += 'Naprawa\n';
    }
    if (this.orderForm.controls.option3.value === true) {
      this.orderdescription += 'Czyszczenie\n';
    }
    if (this.orderForm.controls.option4.value === true) {
      this.orderdescription += 'Konserwacja\n';
    }
    this.orderdescription += this.orderForm.controls.details.value;
    this.order.Description = this.orderdescription;

    this.customerService.newOffer(this.order).pipe(first()).subscribe();
    console.log(this.order);
  }

}
