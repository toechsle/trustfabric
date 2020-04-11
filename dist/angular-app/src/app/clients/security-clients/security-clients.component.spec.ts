import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityClientsComponent } from './security-clients.component';

describe('SecurityClientsComponent', () => {
  let component: SecurityClientsComponent;
  let fixture: ComponentFixture<SecurityClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
