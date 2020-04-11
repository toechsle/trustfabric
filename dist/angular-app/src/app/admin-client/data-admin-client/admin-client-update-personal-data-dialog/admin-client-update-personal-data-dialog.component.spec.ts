import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClientUpdatePersonalDataDialogComponent } from './admin-client-update-personal-data-dialog.component';

describe('AdminClientUpdatePersonalDataDialogComponent', () => {
  let component: AdminClientUpdatePersonalDataDialogComponent;
  let fixture: ComponentFixture<AdminClientUpdatePersonalDataDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminClientUpdatePersonalDataDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClientUpdatePersonalDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
