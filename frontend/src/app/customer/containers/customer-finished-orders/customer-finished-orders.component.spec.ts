import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFinishedOrdersComponent } from './customer-finished-orders.component';

describe('CustomerFinishedOrdersComponent', () => {
  let component: CustomerFinishedOrdersComponent;
  let fixture: ComponentFixture<CustomerFinishedOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerFinishedOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFinishedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
