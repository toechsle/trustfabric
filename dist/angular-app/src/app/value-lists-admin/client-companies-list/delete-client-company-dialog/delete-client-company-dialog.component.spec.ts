import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteClientCompanyDialogComponent } from './delete-client-company-dialog.component';

describe('DeleteClientCompanyDialogComponent', () => {
  let component: DeleteClientCompanyDialogComponent;
  let fixture: ComponentFixture<DeleteClientCompanyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteClientCompanyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteClientCompanyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
