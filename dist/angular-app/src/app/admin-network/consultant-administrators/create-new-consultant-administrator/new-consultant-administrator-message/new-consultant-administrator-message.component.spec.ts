import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConsultantAdministratorMessageComponent } from './new-consultant-administrator-message.component';

describe('NewConsultantAdministratorMessageComponent', () => {
  let component: NewConsultantAdministratorMessageComponent;
  let fixture: ComponentFixture<NewConsultantAdministratorMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewConsultantAdministratorMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewConsultantAdministratorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
