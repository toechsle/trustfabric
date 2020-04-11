import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveConsultantsDialogComponent } from './remove-consultants-dialog.component';

describe('RemoveConsultantsDialogComponent', () => {
  let component: RemoveConsultantsDialogComponent;
  let fixture: ComponentFixture<RemoveConsultantsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveConsultantsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveConsultantsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
