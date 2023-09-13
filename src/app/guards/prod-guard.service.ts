import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
class ProdGuardService {
  realRol:string ='';
  constructor(private tokenService:TokenService, private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const expectedRol = route.data['expectedRol'];
    this.realRol= this.tokenService.isAdmin()?'admin':'user';
    if(!this.tokenService.isLogged() || expectedRol.indexOf(this.realRol) < 0){
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}

export const IsAdminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean =>{
  return inject(ProdGuardService).canActivate(route,state);
}
