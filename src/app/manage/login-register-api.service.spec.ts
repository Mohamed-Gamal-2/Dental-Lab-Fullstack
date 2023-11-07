import { TestBed } from '@angular/core/testing';

import { LoginRegisterAPIService } from './login-register-api.service';

describe('LoginRegisterAPIService', () => {
  let service: LoginRegisterAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginRegisterAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
