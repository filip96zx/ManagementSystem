import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestartpasswordComponent } from './restartpassword.component';

describe('RestartpasswordComponent', () => {
  let component: RestartpasswordComponent;
  let fixture: ComponentFixture<RestartpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestartpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestartpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
