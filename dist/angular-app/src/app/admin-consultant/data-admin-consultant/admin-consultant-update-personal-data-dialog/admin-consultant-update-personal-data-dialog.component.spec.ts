import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConsultantUpdatePersonalDataDialogComponent } from './admin-consultant-update-personal-data-dialog.component';

describe('AdminConsultantUpdatePersonalDataDialogComponent', () => {
  let component: AdminConsultantUpdatePersonalDataDialogComponent;
  let fixture: ComponentFixture<AdminConsultantUpdatePersonalDataDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminConsultantUpdatePersonalDataDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConsultantUpdatePersonalDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
