import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveAccessDialogComponent } from './remove-access-dialog.component';

describe('RemoveAccessDialogComponent', () => {
  let component: RemoveAccessDialogComponent;
  let fixture: ComponentFixture<RemoveAccessDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveAccessDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveAccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
