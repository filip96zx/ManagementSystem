import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerGetOrderComponent } from './customer-get-order.component';

describe('CustomerGetOrderComponent', () => {
  let component: CustomerGetOrderComponent;
  let fixture: ComponentFixture<CustomerGetOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerGetOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerGetOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
