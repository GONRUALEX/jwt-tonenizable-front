import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductoComponent } from './pages/producto/lista-producto/lista-producto.component';
import { DetalleProductoComponent } from './pages/producto/detalle-producto/detalle-producto.component';
import { EditarProductoComponent } from './pages/producto/editar-producto/editar-producto.component';
import { NuevoProductoComponent } from './pages/producto/nuevo-producto/nuevo-producto.component';
import { IndexComponent } from './pages/index/index.component';
import { IsAdminGuard } from './core/guards/prod-guard.service';
import { LoginGuard } from './core/guards/login.guard';
import { SendEmailComponent } from './core/auth/chagePassword/send-email/send-email.component';
import { ChangePasswordComponent } from './core/auth/chagePassword/change-password/change-password.component';
import { PrincipalComponent } from './paypal/components/principal/principal.component';

const routes: Routes = [
  {path:'', component: IndexComponent},
  {path:'principal', component: PrincipalComponent},
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
