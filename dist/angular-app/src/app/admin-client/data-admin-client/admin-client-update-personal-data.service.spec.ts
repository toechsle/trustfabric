import { TestBed, inject } from '@angular/core/testing';

import { AdminClientUpdatePersonalDataService } from './admin-client-update-personal-data.service';

describe('AdminClientUpdatePersonalDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminClientUpdatePersonalDataService]
    });
  });

  it('should be created', inject([AdminClientUpdatePersonalDataService], (service: AdminClientUpdatePersonalDataService) => {
    expect(service).toBeTruthy();
  }));
});
