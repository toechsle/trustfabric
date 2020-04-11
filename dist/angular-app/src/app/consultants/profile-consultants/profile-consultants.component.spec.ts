import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileConsultantsComponent } from './profile-consultants.component';

describe('ProfileConsultantsComponent', () => {
  let component: ProfileConsultantsComponent;
  let fixture: ComponentFixture<ProfileConsultantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileConsultantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileConsultantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
