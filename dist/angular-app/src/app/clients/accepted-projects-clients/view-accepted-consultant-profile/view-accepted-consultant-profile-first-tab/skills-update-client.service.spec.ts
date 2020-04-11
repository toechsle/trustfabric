import { TestBed, inject } from '@angular/core/testing';

import { SkillsUpdateClientService } from './skills-update-client.service';

describe('SkillsUpdateClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SkillsUpdateClientService]
    });
  });

  it('should be created', inject([SkillsUpdateClientService], (service: SkillsUpdateClientService) => {
    expect(service).toBeTruthy();
  }));
});
