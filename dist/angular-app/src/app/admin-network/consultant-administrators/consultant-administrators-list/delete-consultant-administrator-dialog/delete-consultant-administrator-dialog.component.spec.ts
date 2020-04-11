import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConsultantAdministratorDialogComponent } from './delete-consultant-administrator-dialog.component';

describe('DeleteConsultantAdministratorDialogComponent', () => {
  let component: DeleteConsultantAdministratorDialogComponent;
  let fixture: ComponentFixture<DeleteConsultantAdministratorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteConsultantAdministratorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteConsultantAdministratorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
