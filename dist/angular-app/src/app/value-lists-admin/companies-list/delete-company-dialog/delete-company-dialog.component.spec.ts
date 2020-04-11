import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCompanyDialogComponent } from './delete-company-dialog.component';

describe('DeleteCompanyDialogComponent', () => {
  let component: DeleteCompanyDialogComponent;
  let fixture: ComponentFixture<DeleteCompanyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCompanyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCompanyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
