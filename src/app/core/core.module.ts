import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { MenuComponent } from './menu/menu.component';
import { SendEmailComponent } from './auth/chagePassword/send-email/send-email.component';
import { ChangePasswordComponent } from './auth/chagePassword/change-password/change-password.component';
import { FooterComponent } from './footer/footer.component';
import { ModalLoginComponent } from './auth/modal-login/modal-login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ModalLoginComponent,
    LoginComponent,
    RegistroComponent,
    MenuComponent,
    SendEmailComponent,
    ChangePasswordComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[
    MenuComponent
  ]
})
export class CoreModule { }
