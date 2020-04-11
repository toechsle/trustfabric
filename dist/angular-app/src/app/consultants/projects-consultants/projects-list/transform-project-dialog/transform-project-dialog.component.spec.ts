import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformProjectDialogComponent } from './transform-project-dialog.component';

describe('TransformProjectDialogComponent', () => {
  let component: TransformProjectDialogComponent;
  let fixture: ComponentFixture<TransformProjectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransformProjectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
