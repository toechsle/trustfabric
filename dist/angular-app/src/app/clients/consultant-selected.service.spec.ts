import { TestBed, inject } from '@angular/core/testing';

import { ConsultantSelectedService } from './consultant-selected.service';

describe('ConsultantSelectedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultantSelectedService]
    });
  });

  it('should be created', inject([ConsultantSelectedService], (service: ConsultantSelectedService) => {
    expect(service).toBeTruthy();
  }));
});
