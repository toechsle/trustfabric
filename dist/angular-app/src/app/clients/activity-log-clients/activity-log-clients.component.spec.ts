import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityLogClientsComponent } from './activity-log-clients.component';

describe('ActivityLogClientsComponent', () => {
  let component: ActivityLogClientsComponent;
  let fixture: ComponentFixture<ActivityLogClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityLogClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityLogClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
