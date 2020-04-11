import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClientCompanyMessageComponent } from './new-client-company-message.component';

describe('NewClientCompanyMessageComponent', () => {
  let component: NewClientCompanyMessageComponent;
  let fixture: ComponentFixture<NewClientCompanyMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewClientCompanyMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewClientCompanyMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
