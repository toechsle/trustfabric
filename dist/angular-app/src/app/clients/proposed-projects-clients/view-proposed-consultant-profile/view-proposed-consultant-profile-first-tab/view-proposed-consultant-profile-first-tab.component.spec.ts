import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProposedConsultantProfileFirstTabComponent } from './view-proposed-consultant-profile-first-tab.component';

describe('ViewProposedConsultantProfileFirstTabComponent', () => {
  let component: ViewProposedConsultantProfileFirstTabComponent;
  let fixture: ComponentFixture<ViewProposedConsultantProfileFirstTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProposedConsultantProfileFirstTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProposedConsultantProfileFirstTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
