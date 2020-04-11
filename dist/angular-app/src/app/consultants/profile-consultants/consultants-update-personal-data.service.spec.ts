import { TestBed, inject } from '@angular/core/testing';

import { ConsultantsUpdatePersonalDataService } from './consultants-update-personal-data.service';

describe('ConsultantsUpdatePersonalDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultantsUpdatePersonalDataService]
    });
  });

  it('should be created', inject([ConsultantsUpdatePersonalDataService], (service: ConsultantsUpdatePersonalDataService) => {
    expect(service).toBeTruthy();
  }));
});
