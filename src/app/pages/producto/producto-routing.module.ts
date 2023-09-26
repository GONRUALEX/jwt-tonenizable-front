import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductoComponent } from './lista-producto/lista-producto.component';
import { IsAdminGuard } from 'src/app/core/guards/prod-guard.service';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { NuevoProductoComponent } from './nuevo-producto/nuevo-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';

const routes: Routes = [
  {path:'lista', component: ListaProductoComponent, canActivate:[IsAdminGuard], data:{expectedRol: ['admin', 'user']}},
  {path:'detalle/:id', component: DetalleProductoComponent, canActivate:[IsAdminGuard], data:{expectedRol: ['admin', 'user']}},
  {path:'nuevo', component: NuevoProductoComponent, canActivate:[IsAdminGuard], data:{expectedRol: ['admin', 'user']}},
  {path:'editar/:id', component: EditarProductoComponent, canActivate:[IsAdminGuard], data:{expectedRol: ['admin', 'user']}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
