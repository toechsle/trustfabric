import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProjectDialogAcceptedComponent } from './delete-project-dialog-accepted.component';

describe('DeleteProjectDialogAcceptedComponent', () => {
  let component: DeleteProjectDialogAcceptedComponent;
  let fixture: ComponentFixture<DeleteProjectDialogAcceptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteProjectDialogAcceptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProjectDialogAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
