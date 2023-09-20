import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListaProductoComponent } from './pages/producto/lista-producto/lista-producto.component';
import { DetalleProductoComponent } from './pages/producto/detalle-producto/detalle-producto.component';
import { NuevoProductoComponent } from './pages/producto/nuevo-producto/nuevo-producto.component';
import { EditarProductoComponent } from './pages/producto/editar-producto/editar-producto.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './core/auth/login/login.component';
import { RegistroComponent } from './core/auth/registro/registro.component';
import { IndexComponent } from './pages/index/index.component';
import { interceptorProvider } from './core/interceptors/prod-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { ChangePasswordComponent } from './core/auth/chagePassword/change-password/change-password.component';
import { SendEmailComponent } from './core/auth/chagePassword/send-email/send-email.component';
import { MenuComponent } from './core/menu/menu.component';
import { ModalLoginComponent } from './core/auth/modal-login/modal-login.component';
import { ValidationsComponent } from './shared/components/validations/validations.component';
import { FormsComponent } from './shared/components/forms/forms.component';
@NgModule({
  declarations: [
    AppComponent,
    ListaProductoComponent,
    DetalleProductoComponent,
    NuevoProductoComponent,
    EditarProductoComponent,
    LoginComponent,
    RegistroComponent,
    MenuComponent,
    IndexComponent,
    SendEmailComponent,
    ChangePasswordComponent,
    ModalLoginComponent,
    ValidationsComponent,
    FormsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()

  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
