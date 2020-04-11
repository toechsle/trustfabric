import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectDescriptionComponent } from './view-project-description.component';

describe('ViewProjectDescriptionComponent', () => {
  let component: ViewProjectDescriptionComponent;
  let fixture: ComponentFixture<ViewProjectDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProjectDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProjectDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
