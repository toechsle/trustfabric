import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsConsultantsComponent } from './projects-consultants.component';

describe('ProjectsConsultantsComponent', () => {
  let component: ProjectsConsultantsComponent;
  let fixture: ComponentFixture<ProjectsConsultantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsConsultantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsConsultantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
