import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConsultantDialogComponent } from './delete-consultant-dialog.component';

describe('DeleteConsultantDialogComponent', () => {
  let component: DeleteConsultantDialogComponent;
  let fixture: ComponentFixture<DeleteConsultantDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteConsultantDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteConsultantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
