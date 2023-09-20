import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

const TOKEN_KEY = 'AuthToken';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  isVarLogged: Subject<boolean> = new BehaviorSubject(false);
  isVarAdmin: Subject<boolean> = new BehaviorSubject(false)
  userName:string = "";
  roles: Array<string> = [];
  constructor(private router: Router) { }

  public setToken(token: string): void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    this.setUsername();
    this.isLogged();
    this.isAdmin();
  }

  public getToken():string | null{
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public isLogged():void{
    if (this.getToken()){
      this.sendLogged(true);
    }
    this.sendLogged(false);
  }

  private setUsername(){
    const token = this.getToken();
    const payload = token!.split('.')[1];
    const payloadecode = atob(payload);
    const values = JSON.parse(payloadecode);
    this.userName = values.sub;
  }

  public getUserName():string | null{
    return this.userName;
  }

  public isAdmin():void{
    if (!this.getToken()){
      this.sendLogged(false);
      return;
    }
    const token = this.getToken();
    const payload = token!.split('.')[1];
    const payloadecode = atob(payload);
    const values = JSON.parse(payloadecode);
    const roles = values.roles;
    if (roles.indexOf('ROLE_ADMIN')<0){
      this.sendLogged(false);
    }
    this.sendLogged(true);
  }

  public logOut():void{
    window.sessionStorage.clear();
    this.isLogged();
    this.isAdmin();
    this.router.navigate(['/']);
  }


  public sendAdmin(value:boolean){
    this.isVarAdmin.next(value);
  }

  public getAdmin():Observable<boolean>{
    return this.isVarAdmin.asObservable();
  }

  public sendLogged(value: boolean){
    this.isVarLogged.next(value);
  }

  public getLogged():Observable<boolean>{
    return this.isVarLogged.asObservable();
  }


}
