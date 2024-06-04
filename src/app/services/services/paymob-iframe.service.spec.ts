import { TestBed } from '@angular/core/testing';

import { PaymobIframeService } from './paymob-iframe.service';

describe('PaymobIframeService', () => {
  let service: PaymobIframeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymobIframeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
