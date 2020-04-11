import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewClientCompanyComponent } from './create-new-client-company.component';

describe('CreateNewClientCompanyComponent', () => {
  let component: CreateNewClientCompanyComponent;
  let fixture: ComponentFixture<CreateNewClientCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewClientCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewClientCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
