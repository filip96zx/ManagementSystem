import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerFinishedOrdersComponent } from './worker-finished-orders.component';

describe('WorkerFinishedOrdersComponent', () => {
  let component: WorkerFinishedOrdersComponent;
  let fixture: ComponentFixture<WorkerFinishedOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerFinishedOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerFinishedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
