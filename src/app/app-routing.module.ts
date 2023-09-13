import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductoComponent } from './producto/lista-producto/lista-producto.component';
import { DetalleProductoComponent } from './producto/detalle-producto/detalle-producto.component';
import { EditarProductoComponent } from './producto/editar-producto/editar-producto.component';
import { NuevoProductoComponent } from './producto/nuevo-producto/nuevo-producto.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { IsAdminGuard } from './guards/prod-guard.service';
import { LoginGuard } from './guards/login.guard';
import { SendEmailComponent } from './auth/changePassword/send-email/send-email.component';
import { ChangePasswordComponent } from './auth/changePassword/change-password/change-password.component';

const routes: Routes = [
  {path:'', component: IndexComponent},
  {path:'login', component: LoginComponent, canActivate:[LoginGuard]},
  {path:'registro', component: RegistroComponent, canActivate:[LoginGuard]},
  {path:'sendemail', component: SendEmailComponent, canActivate:[LoginGuard]},
  {path:'change-password/:tokenpassword', component: ChangePasswordComponent, canActivate:[LoginGuard]},
  {path:'lista', component: ListaProductoComponent, canActivate:[IsAdminGuard], data:{expectedRol: ['admin', 'user']}},
  {path:'detalle/:id', component: DetalleProductoComponent, canActivate:[IsAdminGuard], data:{expectedRol: ['admin', 'user']}},
  {path:'nuevo', component: NuevoProductoComponent, canActivate:[IsAdminGuard], data:{expectedRol: ['admin', 'user']}},
  {path:'editar/:id', component: EditarProductoComponent, canActivate:[IsAdminGuard], data:{expectedRol: ['admin', 'user']}},
  {path:'**', redirectTo:'', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
