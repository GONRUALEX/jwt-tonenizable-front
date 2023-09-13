import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../service/token.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  nuevoUsuario?: NuevoUsuario;
  nombreUsuario?:string;
  nombre?: string;
  email?:string;
  password?: string;
  errMsj?: string;

  constructor(private tokenService: TokenService, private authService: AuthService, private router: Router, private toastr: ToastrService){}

  ngOnInit(){

  }

  onRegister(){
    this.nuevoUsuario = new NuevoUsuario(this.nombre!, this.nombreUsuario!, this.email!, this.password!);
    this.authService.nuevo(this.nuevoUsuario).subscribe({
      next: (data)=>{
        this.toastr.success("Nuevo usario creado " +  data.nombreUsuario,"😀", {
          timeOut:3000, positionClass: 'toast-top-center'
        })
        this.router.navigate(['/login']);
      }, error: (err)=>{
        this.errMsj = err.error!=null? err.error.mensaje: "Algo a ocurrido, vuelve a intentarlo";
        this.toastr.error(this.errMsj +" 😒", 'Error en el registro', {
      timeOut: 3000, positionClass: 'toast-top-center'
    })
      }
    })
  }

}
