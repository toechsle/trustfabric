import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPasswordMessageAdminConsultantComponent } from './new-password-message-admin-consultant.component';

describe('NewPasswordMessageAdminConsultantComponent', () => {
  let component: NewPasswordMessageAdminConsultantComponent;
  let fixture: ComponentFixture<NewPasswordMessageAdminConsultantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPasswordMessageAdminConsultantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPasswordMessageAdminConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
