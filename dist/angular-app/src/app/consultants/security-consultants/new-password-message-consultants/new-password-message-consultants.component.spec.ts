import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPasswordMessageConsultantsComponent } from './new-password-message-consultants.component';

describe('NewPasswordMessageConsultantsComponent', () => {
  let component: NewPasswordMessageConsultantsComponent;
  let fixture: ComponentFixture<NewPasswordMessageConsultantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPasswordMessageConsultantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPasswordMessageConsultantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
