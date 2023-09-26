import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { ListaProductoComponent } from './lista-producto/lista-producto.component';
import { NuevoProductoComponent } from './nuevo-producto/nuevo-producto.component';
import { ProductoRoutingModule } from './producto-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DetalleProductoComponent,
    EditarProductoComponent,
    ListaProductoComponent,
    NuevoProductoComponent,
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProductoModule { }
