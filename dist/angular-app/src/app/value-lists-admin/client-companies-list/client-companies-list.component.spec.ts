import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCompaniesListComponent } from './client-companies-list.component';

describe('ClientCompaniesListComponent', () => {
  let component: ClientCompaniesListComponent;
  let fixture: ComponentFixture<ClientCompaniesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientCompaniesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCompaniesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
