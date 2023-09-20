import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginUsuario } from '../../../shared/model/login-usuario';
import { TokenService } from '../../services/token.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Errors } from 'src/app/shared/types/errors';
import { Forms } from 'src/app/shared/model/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  @Output() close = new EventEmitter<boolean>();
  loginUsuario?: LoginUsuario;
  errMsj?: string;
  optionsForm: Forms[];
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
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
      }
    ]
    this.myForm = this.fb.group({
      password: ['',  [Validators.required, Validators.minLength(8), Validators.maxLength(30),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!$_%*?&])([A-Za-z\d$@$!$_%*?&]|[^ ,.#~()-]){8,}$')]],
      nombreUsuario: ['',[Validators.minLength(3), Validators.maxLength(30), Validators.required]],
    })
  }

  getResult(event:FormGroup):void{
    this.onLogin(event);
  }

  onLogin(form:FormGroup): void {
    this.loginUsuario = new LoginUsuario(form.value.nombreUsuario, form.value.password);
    this.authService.login(this.loginUsuario).subscribe({
      next: (data: any) => {
        this.tokenService.setToken(data.token);
        this.close.emit(true);
        setTimeout(
          () =>
            this.toastr.success(
              'Bienvenido 😀 ' + this.tokenService.getUserName(),
              '',
              {
                timeOut: 3000,
                positionClass: 'toast-top-center',
              }
            ),
          500
        );
        this.reset();
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errMsj = err.error != null ? err.error.mensaje : 'No autorizado';
        this.toastr.error(this.errMsj + ' 😒', 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      },
    });
  }
  reset(){
    this.myForm.reset();
  }
}
