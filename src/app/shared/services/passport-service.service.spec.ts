import { TestBed, inject } from '@angular/core/testing';

import { PassportServiceService } from './passport-service.service';

describe('PassportServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PassportServiceService]
    });
  });

  it('should be created', inject([PassportServiceService], (service: PassportServiceService) => {
    expect(service).toBeTruthy();
  }));
});
