import { Component, OnInit } from '@angular/core';
import { LoginUsuario } from '../../model/login-usuario';
import { TokenService } from '../../service/token.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginUsuario? : LoginUsuario;
  nombreUsuario?: string;
  password?: string;
  errMsj?:string;
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ){

  }

  ngOnInit(){

  }

  onLogin(): void{
    this.loginUsuario = new LoginUsuario(this.nombreUsuario!, this.password!);
    this.authService.login(this.loginUsuario).subscribe({next: (data:any)=>{
      this.tokenService.setToken(data.token);
      this.toastr.success("Bienvenido 😀 " +  data.nombreUsuario,"", {
        timeOut:3000, positionClass: 'toast-top-center'
      })
      this.router.navigate(['/']);
    },
  error: (err)=>{
    this.errMsj = err.error!=null? err.error.mensaje: "No autorizado";
    this.toastr.error(this.errMsj +" 😒", 'Fail', {
      timeOut: 3000, positionClass: 'toast-top-center'
    })

  }});
  }
}
