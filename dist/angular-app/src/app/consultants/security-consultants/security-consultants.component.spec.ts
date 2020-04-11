import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityConsultantsComponent } from './security-consultants.component';

describe('SecurityConsultantsComponent', () => {
  let component: SecurityConsultantsComponent;
  let fixture: ComponentFixture<SecurityConsultantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityConsultantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityConsultantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
