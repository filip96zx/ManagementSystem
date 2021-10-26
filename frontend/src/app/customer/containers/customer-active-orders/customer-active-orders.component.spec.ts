import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerActiveOrdersComponent } from './customer-active-orders.component';

describe('CustomerActiveOrdersComponent', () => {
  let component: CustomerActiveOrdersComponent;
  let fixture: ComponentFixture<CustomerActiveOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerActiveOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerActiveOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
