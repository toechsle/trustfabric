import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAcceptedConsultantProfileComponent } from './view-accepted-consultant-profile.component';

describe('ViewAcceptedConsultantProfileComponent', () => {
  let component: ViewAcceptedConsultantProfileComponent;
  let fixture: ComponentFixture<ViewAcceptedConsultantProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAcceptedConsultantProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAcceptedConsultantProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
