import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSkillMessageComponent } from './new-skill-message.component';

describe('NewSkillMessageComponent', () => {
  let component: NewSkillMessageComponent;
  let fixture: ComponentFixture<NewSkillMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSkillMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSkillMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
