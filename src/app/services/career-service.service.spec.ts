import { TestBed, inject } from '@angular/core/testing';

import { CareerServiceService } from './career-service.service';

describe('CareerServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CareerServiceService]
    });
  });

  it('should be created', inject([CareerServiceService], (service: CareerServiceService) => {
    expect(service).toBeTruthy();
  }));
});
