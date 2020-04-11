import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantAdministratorsListComponent } from './consultant-administrators-list.component';

describe('ConsultantAdministratorsListComponent', () => {
  let component: ConsultantAdministratorsListComponent;
  let fixture: ComponentFixture<ConsultantAdministratorsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantAdministratorsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantAdministratorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
