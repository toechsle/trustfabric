import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMembersConsultantsComponent } from './team-members-consultants.component';

describe('TeamMembersConsultantsComponent', () => {
  let component: TeamMembersConsultantsComponent;
  let fixture: ComponentFixture<TeamMembersConsultantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamMembersConsultantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMembersConsultantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
