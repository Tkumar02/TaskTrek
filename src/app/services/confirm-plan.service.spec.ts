import { TestBed } from '@angular/core/testing';

import { ConfirmPlanService } from './confirm-plan.service';

describe('ConfirmPlanService', () => {
  let service: ConfirmPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
