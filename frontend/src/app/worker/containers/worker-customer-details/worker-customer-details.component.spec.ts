import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerCustomerDetailsComponent } from './worker-customer-details.component';

describe('WorkerCustomerDetailsComponent', () => {
  let component: WorkerCustomerDetailsComponent;
  let fixture: ComponentFixture<WorkerCustomerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerCustomerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerCustomerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
