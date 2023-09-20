import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { TokenService } from '../../core/services/token.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy{
  nombreUsuario:string ='';
  subscriptions: Subscription[] = [];
  isLogged: boolean = false;
  constructor(private tokenService: TokenService,  private ngZone: NgZone){}
  ngOnDestroy(): void {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }
  ngOnInit(){
    this.subscriptions.push(this.tokenService.getLogged().subscribe(data=>{
      this.ngZone.run(() => {
        this.isLogged = data;
      if (data){
        this.nombreUsuario = this.tokenService.getUserName()!;
      }else{
        this.nombreUsuario = "Anónimo";
      }
      });

    }));

  }
}
