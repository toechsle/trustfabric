import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConsultantsDialogComponent } from './add-consultants-dialog.component';

describe('AddConsultantsDialogComponent', () => {
  let component: AddConsultantsDialogComponent;
  let fixture: ComponentFixture<AddConsultantsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddConsultantsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConsultantsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
