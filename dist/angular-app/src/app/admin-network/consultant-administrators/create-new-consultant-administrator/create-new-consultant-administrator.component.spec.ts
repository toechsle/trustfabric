import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewConsultantAdministratorComponent } from './create-new-consultant-administrator.component';

describe('CreateNewConsultantAdministratorComponent', () => {
  let component: CreateNewConsultantAdministratorComponent;
  let fixture: ComponentFixture<CreateNewConsultantAdministratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewConsultantAdministratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewConsultantAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
