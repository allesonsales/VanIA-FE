import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

export const guestGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.validarAuth().pipe(
    map(() => {
      router.navigate(['/dashboard']);
      return false;
    }),
    catchError(() => of(true)),
  );
};
