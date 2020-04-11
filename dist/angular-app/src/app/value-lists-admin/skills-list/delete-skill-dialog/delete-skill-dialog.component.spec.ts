import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSkillDialogComponent } from './delete-skill-dialog.component';

describe('DeleteSkillDialogComponent', () => {
  let component: DeleteSkillDialogComponent;
  let fixture: ComponentFixture<DeleteSkillDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSkillDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSkillDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
