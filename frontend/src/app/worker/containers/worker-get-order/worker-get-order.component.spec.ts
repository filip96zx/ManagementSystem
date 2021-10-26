import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerGetOrderComponent } from './worker-get-order.component';

describe('WorkerGetOrderComponent', () => {
  let component: WorkerGetOrderComponent;
  let fixture: ComponentFixture<WorkerGetOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerGetOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerGetOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
