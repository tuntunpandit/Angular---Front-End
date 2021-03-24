import { TestBed } from '@angular/core/testing';

import { SocialLoginService } from './social-login.service';

describe('SocialLoginService', () => {
  let service: SocialLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
