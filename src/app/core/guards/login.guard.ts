import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard  {
  isLogged: boolean = false;
  constructor(private tokenService: TokenService, private router: Router){
    this.tokenService.getLogged().subscribe(data=>{
      this.isLogged = data;
    })
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
    if (this.isLogged){
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}

export const IsLoginGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean =>{
  return inject(LoginGuard).canActivate(route,state);
}

