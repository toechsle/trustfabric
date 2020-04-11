import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProposedConsultantProfileComponent } from './view-proposed-consultant-profile.component';

describe('ViewProposedConsultantProfileComponent', () => {
  let component: ViewProposedConsultantProfileComponent;
  let fixture: ComponentFixture<ViewProposedConsultantProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProposedConsultantProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProposedConsultantProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
