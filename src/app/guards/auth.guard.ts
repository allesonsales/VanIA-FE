import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, map, of } from 'rxjs';

export const authGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.validarAuth().pipe(
    map((res: any) => {
      console.log('authguard autorizado: ', res);

      const roleRota = route.data['role'];
      const tipoUsuario = res.usuario.tipo;

      if (roleRota && roleRota !== tipoUsuario) {
        if (tipoUsuario === 2) {
          return router.createUrlTree(['/motorista']);
        } else {
          return router.createUrlTree(['/dashboard']);
        }
      }

      return true;
    }),
    catchError(() => {
      return of(router.createUrlTree(['/login']));
    }),
  );
};
