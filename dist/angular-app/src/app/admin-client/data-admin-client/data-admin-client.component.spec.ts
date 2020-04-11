import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAdminClientComponent } from './data-admin-client.component';

describe('DataAdminClientComponent', () => {
  let component: DataAdminClientComponent;
  let fixture: ComponentFixture<DataAdminClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataAdminClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAdminClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
