import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/shared/model/product';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})
export class DetalleProductoComponent implements OnInit{
  errMsj: string = '';
  id?:number;
  producto?:Producto;
  constructor(
    private productoService:ProductoService,
    private activatedRoute:ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ){
  }

  ngOnInit(): void {
      this.id = this.activatedRoute.snapshot.params['id'];
      this.getDetall();
  }

  getDetall(){
    this.productoService.detail(this.id!).subscribe({
      next:(data)=>{
        this.producto = data;
      },
      error:(err)=>{
        this.router.navigate(['/']);
        this.errMsj = err.error!=null? err.error.mensaje: "No autorizado";
        this.toastr.error(this.errMsj +" 😒", 'Ha ocurrido algún error en el momento de la carga', {
        timeOut: 3000, positionClass: 'toast-top-center'
    })
      }
    })
  }

  volver():void{
    this.router.navigate(['/mantenimiento/lista'])
  }
}
