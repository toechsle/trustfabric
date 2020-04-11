import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedProjectsClientsComponent } from './accepted-projects-clients.component';

describe('AcceptedProjectsClientsComponent', () => {
  let component: AcceptedProjectsClientsComponent;
  let fixture: ComponentFixture<AcceptedProjectsClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptedProjectsClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedProjectsClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
