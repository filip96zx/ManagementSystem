import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerFinishedOrdersComponent } from './manager-finished-orders.component';

describe('ManagerFinishedOrdersComponent', () => {
  let component: ManagerFinishedOrdersComponent;
  let fixture: ComponentFixture<ManagerFinishedOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerFinishedOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerFinishedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
