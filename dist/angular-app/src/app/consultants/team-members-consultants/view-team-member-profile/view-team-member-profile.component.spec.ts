import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTeamMemberProfileComponent } from './view-team-member-profile.component';

describe('ViewTeamMemberProfileComponent', () => {
  let component: ViewTeamMemberProfileComponent;
  let fixture: ComponentFixture<ViewTeamMemberProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTeamMemberProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTeamMemberProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
