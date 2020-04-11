import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAdministratorsListComponent } from './client-administrators-list.component';

describe('ClientAdministratorsListComponent', () => {
  let component: ClientAdministratorsListComponent;
  let fixture: ComponentFixture<ClientAdministratorsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientAdministratorsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAdministratorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
