import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankCreditComponent } from './bank-credit.component';

describe('BankCreditComponent', () => {
  let component: BankCreditComponent;
  let fixture: ComponentFixture<BankCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankCreditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
