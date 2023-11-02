import { TestBed } from '@angular/core/testing';

import { DentistServiceService } from './dentist-service.service';

describe('DentistServiceService', () => {
  let service: DentistServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DentistServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
