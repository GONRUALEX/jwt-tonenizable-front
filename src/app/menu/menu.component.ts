import { Component } from '@angular/core';
import { TokenService } from '../service/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  isLogged = false;
  isAdmin = false;
  constructor(private tokenService:TokenService, private router: Router){}
  ngOnInit():void{
   this.isLogged=this.tokenService.isLogged();
    this.isAdmin=this.tokenService.isAdmin();
  }

  onLogout():void{
    this.tokenService.logOut();
    this.router.navigate(['/login']);
  }
}
