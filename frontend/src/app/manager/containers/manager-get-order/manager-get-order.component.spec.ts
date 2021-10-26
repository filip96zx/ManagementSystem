import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerGetOrderComponent } from './manager-get-order.component';

describe('ManagerGetOrderComponent', () => {
  let component: ManagerGetOrderComponent;
  let fixture: ComponentFixture<ManagerGetOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerGetOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerGetOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
