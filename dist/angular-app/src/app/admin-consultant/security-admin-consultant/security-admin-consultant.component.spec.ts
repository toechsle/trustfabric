import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityAdminConsultantComponent } from './security-admin-consultant.component';

describe('SecurityAdminConsultantComponent', () => {
  let component: SecurityAdminConsultantComponent;
  let fixture: ComponentFixture<SecurityAdminConsultantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityAdminConsultantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityAdminConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
