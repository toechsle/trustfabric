import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantAdministratorsComponent } from './consultant-administrators.component';

describe('ConsultantAdministratorsComponent', () => {
  let component: ConsultantAdministratorsComponent;
  let fixture: ComponentFixture<ConsultantAdministratorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantAdministratorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantAdministratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
