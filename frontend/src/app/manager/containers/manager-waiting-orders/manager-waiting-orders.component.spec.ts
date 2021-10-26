import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerWaitingOrdersComponent } from './manager-waiting-orders.component';

describe('ManagerWaitingOrdersComponent', () => {
  let component: ManagerWaitingOrdersComponent;
  let fixture: ComponentFixture<ManagerWaitingOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerWaitingOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerWaitingOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
