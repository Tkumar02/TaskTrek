import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessHomeComponent } from './fitness-home.component';

describe('FitnessHomeComponent', () => {
  let component: FitnessHomeComponent;
  let fixture: ComponentFixture<FitnessHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FitnessHomeComponent]
    });
    fixture = TestBed.createComponent(FitnessHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
