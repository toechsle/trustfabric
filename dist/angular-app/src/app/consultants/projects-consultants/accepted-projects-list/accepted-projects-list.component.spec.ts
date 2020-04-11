import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedProjectsListComponent } from './accepted-projects-list.component';

describe('AcceptedProjectsListComponent', () => {
  let component: AcceptedProjectsListComponent;
  let fixture: ComponentFixture<AcceptedProjectsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptedProjectsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedProjectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
