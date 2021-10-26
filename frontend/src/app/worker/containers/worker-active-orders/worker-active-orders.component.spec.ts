import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerActiveOrdersComponent } from './worker-active-orders.component';

describe('WorkerActiveOrdersComponent', () => {
  let component: WorkerActiveOrdersComponent;
  let fixture: ComponentFixture<WorkerActiveOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerActiveOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerActiveOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
