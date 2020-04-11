import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConsultantsDialogAcceptedComponent } from './add-consultants-dialog-accepted.component';

describe('AddConsultantsDialogAcceptedComponent', () => {
  let component: AddConsultantsDialogAcceptedComponent;
  let fixture: ComponentFixture<AddConsultantsDialogAcceptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddConsultantsDialogAcceptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConsultantsDialogAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
