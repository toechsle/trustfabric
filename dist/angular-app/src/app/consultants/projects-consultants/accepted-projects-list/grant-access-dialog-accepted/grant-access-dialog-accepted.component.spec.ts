import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantAccessDialogAcceptedComponent } from './grant-access-dialog-accepted.component';

describe('GrantAccessDialogAcceptedComponent', () => {
  let component: GrantAccessDialogAcceptedComponent;
  let fixture: ComponentFixture<GrantAccessDialogAcceptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrantAccessDialogAcceptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantAccessDialogAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
