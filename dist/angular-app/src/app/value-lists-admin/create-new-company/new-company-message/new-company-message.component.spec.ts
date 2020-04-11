import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCompanyMessageComponent } from './new-company-message.component';

describe('NewCompanyMessageComponent', () => {
  let component: NewCompanyMessageComponent;
  let fixture: ComponentFixture<NewCompanyMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCompanyMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCompanyMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
