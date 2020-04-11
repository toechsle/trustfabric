import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewConsultantComponent } from './create-new-consultant.component';

describe('CreateNewConsultantComponent', () => {
  let component: CreateNewConsultantComponent;
  let fixture: ComponentFixture<CreateNewConsultantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewConsultantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
