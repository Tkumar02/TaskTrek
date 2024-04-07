import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanTodayComponent } from './plan-today.component';

describe('PlanTodayComponent', () => {
  let component: PlanTodayComponent;
  let fixture: ComponentFixture<PlanTodayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanTodayComponent]
    });
    fixture = TestBed.createComponent(PlanTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
