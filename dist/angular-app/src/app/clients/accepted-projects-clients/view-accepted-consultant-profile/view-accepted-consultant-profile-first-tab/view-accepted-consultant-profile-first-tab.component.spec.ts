import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAcceptedConsultantProfileFirstTabComponent } from './view-accepted-consultant-profile-first-tab.component';

describe('ViewAcceptedConsultantProfileFirstTabComponent', () => {
  let component: ViewAcceptedConsultantProfileFirstTabComponent;
  let fixture: ComponentFixture<ViewAcceptedConsultantProfileFirstTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAcceptedConsultantProfileFirstTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAcceptedConsultantProfileFirstTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
