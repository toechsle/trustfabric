import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClientMessageComponent } from './new-client-message.component';

describe('NewClientMessageComponent', () => {
  let component: NewClientMessageComponent;
  let fixture: ComponentFixture<NewClientMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewClientMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewClientMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
