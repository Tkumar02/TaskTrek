import { TestBed } from '@angular/core/testing';

import { AddFoodDataService } from './add-food-data.service';

describe('AddFoodDataService', () => {
  let service: AddFoodDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddFoodDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
