import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantsUpdatePersonalDataDialogComponent } from './consultants-update-personal-data-dialog.component';

describe('ConsultantsUpdatePersonalDataDialogComponent', () => {
  let component: ConsultantsUpdatePersonalDataDialogComponent;
  let fixture: ComponentFixture<ConsultantsUpdatePersonalDataDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantsUpdatePersonalDataDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantsUpdatePersonalDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
