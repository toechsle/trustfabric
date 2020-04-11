import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConsultantMessageComponent } from './new-consultant-message.component';

describe('NewConsultantMessageComponent', () => {
  let component: NewConsultantMessageComponent;
  let fixture: ComponentFixture<NewConsultantMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewConsultantMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewConsultantMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
