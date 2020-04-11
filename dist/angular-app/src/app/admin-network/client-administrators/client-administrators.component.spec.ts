import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAdministratorsComponent } from './client-administrators.component';

describe('ClientAdministratorsComponent', () => {
  let component: ClientAdministratorsComponent;
  let fixture: ComponentFixture<ClientAdministratorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientAdministratorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAdministratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
