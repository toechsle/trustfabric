import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveConsultantsDialogAcceptedComponent } from './remove-consultants-dialog-accepted.component';

describe('RemoveConsultantsDialogAcceptedComponent', () => {
  let component: RemoveConsultantsDialogAcceptedComponent;
  let fixture: ComponentFixture<RemoveConsultantsDialogAcceptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveConsultantsDialogAcceptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveConsultantsDialogAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
