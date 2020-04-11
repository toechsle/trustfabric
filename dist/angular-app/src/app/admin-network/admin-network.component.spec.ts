import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNetworkComponent } from './admin-network.component';

describe('AdminNetworkComponent', () => {
  let component: AdminNetworkComponent;
  let fixture: ComponentFixture<AdminNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
