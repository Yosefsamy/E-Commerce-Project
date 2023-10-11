import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authDeActivateGuard } from './auth-de-activate.guard';

describe('authDeActivateGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authDeActivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
