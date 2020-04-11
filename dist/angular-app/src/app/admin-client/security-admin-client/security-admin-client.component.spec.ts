import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityAdminClientComponent } from './security-admin-client.component';

describe('SecurityAdminClientComponent', () => {
  let component: SecurityAdminClientComponent;
  let fixture: ComponentFixture<SecurityAdminClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityAdminClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityAdminClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
