import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import {AuthService} from '../services/auth.service';
import {firstValueFrom} from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);

  const isAuthenticated = await firstValueFrom(authService.login());

  if (isAuthenticated) {
    return true;
  } else {
    return false;
  }
};
