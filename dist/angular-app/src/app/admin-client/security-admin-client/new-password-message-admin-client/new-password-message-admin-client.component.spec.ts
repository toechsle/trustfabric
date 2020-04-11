import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPasswordMessageAdminClientComponent } from './new-password-message-admin-client.component';

describe('NewPasswordMessageAdminClientComponent', () => {
  let component: NewPasswordMessageAdminClientComponent;
  let fixture: ComponentFixture<NewPasswordMessageAdminClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPasswordMessageAdminClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPasswordMessageAdminClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
