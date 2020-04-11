import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposedProjectsClientsComponent } from './proposed-projects-clients.component';

describe('ProposedProjectsClientsComponent', () => {
  let component: ProposedProjectsClientsComponent;
  let fixture: ComponentFixture<ProposedProjectsClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposedProjectsClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposedProjectsClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
