import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FawryPaymentComponent } from './fawry-payment.component';

describe('FawryPaymentComponent', () => {
  let component: FawryPaymentComponent;
  let fixture: ComponentFixture<FawryPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FawryPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FawryPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
