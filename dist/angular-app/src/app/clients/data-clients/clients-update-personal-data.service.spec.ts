import { TestBed, inject } from '@angular/core/testing';

import { ClientsUpdatePersonalDataService } from './clients-update-personal-data.service';

describe('ClientsUpdatePersonalDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientsUpdatePersonalDataService]
    });
  });

  it('should be created', inject([ClientsUpdatePersonalDataService], (service: ClientsUpdatePersonalDataService) => {
    expect(service).toBeTruthy();
  }));
});
