import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataClientsComponent } from './data-clients.component';

describe('DataClientsComponent', () => {
  let component: DataClientsComponent;
  let fixture: ComponentFixture<DataClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
