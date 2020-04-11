import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteClientAdministratorDialogComponent } from './delete-client-administrator-dialog.component';

describe('DeleteClientAdministratorDialogComponent', () => {
  let component: DeleteClientAdministratorDialogComponent;
  let fixture: ComponentFixture<DeleteClientAdministratorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteClientAdministratorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteClientAdministratorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
