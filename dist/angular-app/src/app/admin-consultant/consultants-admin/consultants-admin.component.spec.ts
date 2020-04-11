import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantsAdminComponent } from './consultants-admin.component';

describe('ConsultantsAdminComponent', () => {
  let component: ConsultantsAdminComponent;
  let fixture: ComponentFixture<ConsultantsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
