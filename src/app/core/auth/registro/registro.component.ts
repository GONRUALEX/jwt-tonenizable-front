import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/shared/model/nuevo-usuario';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Forms } from 'src/app/shared/model/forms';
import { Errors } from 'src/app/shared/types/errors';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  myForm: FormGroup;
  @Output() close = new EventEmitter<boolean>();
  nuevoUsuario?: NuevoUsuario;
  errMsj?: string;
  optionsForm: Forms[];

  constructor( private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService){}

  ngOnInit(){
    this.optionsForm=[
      {
        "nameString": "nombreUsuario",
        "validations": [Errors.MAX_LENGTH, Errors.MIN_LENGTH, Errors.REQUIRED],
        "name":"Nombre Usuario"
      },
      {
        "nameString": "password",
        "validations": [Errors.MAX_LENGTH, Errors.MIN_LENGTH, Errors.REQUIRED, Errors.PATTERN],
        "name":"Contraseña"
      },
      {
        "nameString": "nombre",
        "validations": [Errors.MAX_LENGTH, Errors.MIN_LENGTH, Errors.REQUIRED],
        "name":"Nombre"
      },
      {
        "nameString": "email",
        "validations": [Errors.MAX_LENGTH, Errors.MIN_LENGTH, Errors.REQUIRED, Errors.EMAIL],
        "name":"Correo Electronico"
      }
    ]
    this.myForm = this.fb.group({
      nombre: ['',[Validators.minLength(3), Validators.maxLength(30), Validators.required]],
      email: ['',[Validators.minLength(3), Validators.maxLength(30), Validators.required,Validators.email]],
      password: ['',  [Validators.required, Validators.minLength(8), Validators.maxLength(30),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!$_%*?&])([A-Za-z\d$@$!$_%*?&]|[^ ,.#~()-]){8,}$')]],
      nombreUsuario: ['',[Validators.minLength(3), Validators.maxLength(30), Validators.required]],
    })
  }

  getResult(event:FormGroup):void{
    this.onRegister(event);
  }
  onRegister(form:FormGroup){
    this.nuevoUsuario = new NuevoUsuario(form.value.nombre, form.value.nombreUsuario, form.value.email, form.value.password);
    this.authService.nuevo(this.nuevoUsuario).subscribe({
      next: (data)=>{
        this.toastr.success("Nuevo usario creado " +  data.nombreUsuario,"😀", {
          timeOut:3000, positionClass: 'toast-top-center'
        })
        this.close.emit(true);
        this.reset();
        this.router.navigate(['/login']);
      }, error: (err)=>{
        this.errMsj = err.error!=null? err.error.mensaje: "Algo a ocurrido, vuelve a intentarlo";
        this.toastr.error(this.errMsj +" 😒", 'Error en el registro', {
      timeOut: 3000, positionClass: 'toast-top-center'
    })
      }
    })
  }

  reset(){
    this.myForm.reset();
  }
}
