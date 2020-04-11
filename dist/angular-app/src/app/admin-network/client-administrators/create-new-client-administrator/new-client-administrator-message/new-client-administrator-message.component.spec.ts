import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClientAdministratorMessageComponent } from './new-client-administrator-message.component';

describe('NewClientAdministratorMessageComponent', () => {
  let component: NewClientAdministratorMessageComponent;
  let fixture: ComponentFixture<NewClientAdministratorMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewClientAdministratorMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewClientAdministratorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
