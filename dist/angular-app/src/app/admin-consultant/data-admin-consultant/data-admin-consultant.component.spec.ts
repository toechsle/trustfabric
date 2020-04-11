import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAdminConsultantComponent } from './data-admin-consultant.component';

describe('DataAdminConsultantComponent', () => {
  let component: DataAdminConsultantComponent;
  let fixture: ComponentFixture<DataAdminConsultantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataAdminConsultantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAdminConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
