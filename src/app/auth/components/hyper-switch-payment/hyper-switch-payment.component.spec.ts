import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HyperSwitchPaymentComponent } from './hyper-switch-payment.component';

describe('HyperSwitchPaymentComponent', () => {
  let component: HyperSwitchPaymentComponent;
  let fixture: ComponentFixture<HyperSwitchPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HyperSwitchPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HyperSwitchPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
