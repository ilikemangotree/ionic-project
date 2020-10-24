import { TestBed, inject } from '@angular/core/testing';

import { SettingServiceService } from './setting-service.service';

describe('SettingServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingServiceService]
    });
  });

  it('should be created', inject([SettingServiceService], (service: SettingServiceService) => {
    expect(service).toBeTruthy();
  }));
});
