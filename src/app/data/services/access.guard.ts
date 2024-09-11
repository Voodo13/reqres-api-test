import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

export const canActivateAuth = () => {
  const router = inject(Router)
  const isLoggedIn = inject(AuthService).checkIsAuth
  if (isLoggedIn) {
    return true
  }
  return router.createUrlTree(['/login'])
}
