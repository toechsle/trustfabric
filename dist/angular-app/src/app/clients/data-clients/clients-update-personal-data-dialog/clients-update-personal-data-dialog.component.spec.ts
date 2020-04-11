import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsUpdatePersonalDataDialogComponent } from './clients-update-personal-data-dialog.component';

describe('ClientsUpdatePersonalDataDialogComponent', () => {
  let component: ClientsUpdatePersonalDataDialogComponent;
  let fixture: ComponentFixture<ClientsUpdatePersonalDataDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsUpdatePersonalDataDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsUpdatePersonalDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
