import { TestBed } from '@angular/core/testing';

import { LastDrawedMealsService } from './last-drawed-meals.service';

describe('LastDrawedMealsService', () => {
  let service: LastDrawedMealsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LastDrawedMealsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
