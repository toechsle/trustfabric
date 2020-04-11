import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProposedProjectMessageComponent } from './new-proposed-project-message.component';

describe('NewProposedProjectMessageComponent', () => {
  let component: NewProposedProjectMessageComponent;
  let fixture: ComponentFixture<NewProposedProjectMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProposedProjectMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProposedProjectMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
