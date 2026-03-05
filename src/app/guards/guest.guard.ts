import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

export const guestGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.validarAuth().pipe(
    map((res: any) => {
      if (res.usuario.tipo == 2) {
        router.createUrlTree(['/motorista']);
      }

      return router.createUrlTree(['/dashboard']);
    }),
    catchError(() => of(true)),
  );
};
