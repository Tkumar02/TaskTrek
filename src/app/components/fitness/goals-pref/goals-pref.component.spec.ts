import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsPrefComponent } from './goals-pref.component';

describe('GoalsPrefComponent', () => {
  let component: GoalsPrefComponent;
  let fixture: ComponentFixture<GoalsPrefComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoalsPrefComponent]
    });
    fixture = TestBed.createComponent(GoalsPrefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
