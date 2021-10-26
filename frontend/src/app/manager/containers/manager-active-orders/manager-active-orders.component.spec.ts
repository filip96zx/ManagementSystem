import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerActiveOrdersComponent } from './manager-active-orders.component';

describe('ManagerActiveOrdersComponent', () => {
  let component: ManagerActiveOrdersComponent;
  let fixture: ComponentFixture<ManagerActiveOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerActiveOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerActiveOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
