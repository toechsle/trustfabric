import { TestBed, inject } from '@angular/core/testing';

import { ConsultantsUpdateImageService } from './consultants-update-image.service';

describe('ConsultantsUpdateImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultantsUpdateImageService]
    });
  });

  it('should be created', inject([ConsultantsUpdateImageService], (service: ConsultantsUpdateImageService) => {
    expect(service).toBeTruthy();
  }));
});
