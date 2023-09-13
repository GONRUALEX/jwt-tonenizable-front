import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard  {
  constructor(private tokenService: TokenService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
    if (this.tokenService.isLogged()){
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}

export const IsLoginGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean =>{
  return inject(LoginGuard).canActivate(route,state);
}

