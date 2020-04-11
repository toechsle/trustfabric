import { TestBed, inject } from '@angular/core/testing';

import { AdminConsultantUpdatePersonalDataService } from './admin-consultant-update-personal-data.service';

describe('AdminConsultantUpdatePersonalDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminConsultantUpdatePersonalDataService]
    });
  });

  it('should be created', inject([AdminConsultantUpdatePersonalDataService], (service: AdminConsultantUpdatePersonalDataService) => {
    expect(service).toBeTruthy();
  }));
});
