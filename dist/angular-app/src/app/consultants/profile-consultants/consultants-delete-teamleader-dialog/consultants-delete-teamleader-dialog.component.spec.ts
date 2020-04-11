import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantsDeleteTeamleaderDialogComponent } from './consultants-delete-teamleader-dialog.component';

describe('ConsultantsDeleteTeamleaderDialogComponent', () => {
  let component: ConsultantsDeleteTeamleaderDialogComponent;
  let fixture: ComponentFixture<ConsultantsDeleteTeamleaderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantsDeleteTeamleaderDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantsDeleteTeamleaderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
