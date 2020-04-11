import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSetUpMessageComponent } from './account-set-up-message.component';

describe('AccountSetUpMessageComponent', () => {
  let component: AccountSetUpMessageComponent;
  let fixture: ComponentFixture<AccountSetUpMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSetUpMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSetUpMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
