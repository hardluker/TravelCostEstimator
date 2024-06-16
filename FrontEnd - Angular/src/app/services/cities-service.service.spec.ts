import { TestBed } from '@angular/core/testing';

import { CitiesServiceService } from './cities-service.service';

describe('CitiesServiceService', () => {
  let service: CitiesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitiesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
