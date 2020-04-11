import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantsUpdateImageDialogComponent } from './consultants-update-image-dialog.component';

describe('ConsultantsUpdateImageDialogComponent', () => {
  let component: ConsultantsUpdateImageDialogComponent;
  let fixture: ComponentFixture<ConsultantsUpdateImageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantsUpdateImageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantsUpdateImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
