import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConsultantComponent } from './admin-consultant.component';

describe('AdminConsultantComponent', () => {
  let component: AdminConsultantComponent;
  let fixture: ComponentFixture<AdminConsultantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminConsultantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
