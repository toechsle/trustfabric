import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPasswordMessageClientsComponent } from './new-password-message-clients.component';

describe('NewPasswordMessageClientsComponent', () => {
  let component: NewPasswordMessageClientsComponent;
  let fixture: ComponentFixture<NewPasswordMessageClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPasswordMessageClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPasswordMessageClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
