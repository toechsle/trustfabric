import { TestBed, inject } from '@angular/core/testing';

import { ProjectsUpdateClientService } from './projects-update-client.service';

describe('ProjectsUpdateClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectsUpdateClientService]
    });
  });

  it('should be created', inject([ProjectsUpdateClientService], (service: ProjectsUpdateClientService) => {
    expect(service).toBeTruthy();
  }));
});
