import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveAccessDialogAcceptedComponent } from './remove-access-dialog-accepted.component';

describe('RemoveAccessDialogAcceptedComponent', () => {
  let component: RemoveAccessDialogAcceptedComponent;
  let fixture: ComponentFixture<RemoveAccessDialogAcceptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveAccessDialogAcceptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveAccessDialogAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
