import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewClientAdministratorComponent } from './create-new-client-administrator.component';

describe('CreateNewClientAdministratorComponent', () => {
  let component: CreateNewClientAdministratorComponent;
  let fixture: ComponentFixture<CreateNewClientAdministratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewClientAdministratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewClientAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
