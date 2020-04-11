import { TestBed, inject } from '@angular/core/testing';

import { UiServiceWindowsService } from './ui-service-windows.service';

describe('UiServiceWindowsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiServiceWindowsService]
    });
  });

  it('should be created', inject([UiServiceWindowsService], (service: UiServiceWindowsService) => {
    expect(service).toBeTruthy();
  }));
});
