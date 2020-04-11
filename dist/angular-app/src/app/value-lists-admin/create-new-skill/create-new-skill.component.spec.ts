import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewSkillComponent } from './create-new-skill.component';

describe('CreateNewSkillComponent', () => {
  let component: CreateNewSkillComponent;
  let fixture: ComponentFixture<CreateNewSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewSkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
