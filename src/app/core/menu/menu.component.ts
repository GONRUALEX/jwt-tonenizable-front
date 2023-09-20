import { AfterViewInit, Component, ElementRef, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnDestroy{
  @ViewChild('modalTabs', { static: false }) modalTabs: ElementRef;
  isLogged: boolean = false;
  isAdmin: boolean = false;
  subscription: Subscription[] = [];
  constructor(private tokenService:TokenService, private router: Router, private renderer: Renderer2){}
  ngOnDestroy(): void {
    this.subscription.map(subscription => subscription.unsubscribe());
  }
  ngOnInit():void{
    this.subscription.push(this.tokenService.getAdmin().subscribe((data: boolean)=>{this.isAdmin=data;}));
    this.subscription.push(this.tokenService.getLogged().subscribe((data: boolean)=>{this.isLogged=data}));

  }

  onLogout():void{
    this.tokenService.logOut();
    setTimeout(()=>this.router.navigate(['/login']),1000);
  }

  closeModal(event:any){
    this.renderer.selectRootElement('#modalClose').click();
  }

}
