import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountChartsComponent } from './accounts-charts.component';

describe('GeneralLedgerComponent', () => {
  let component: AccountChartsComponent;
  let fixture: ComponentFixture<AccountChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
