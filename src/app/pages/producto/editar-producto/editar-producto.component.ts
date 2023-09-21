import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/shared/model/producto';
import { ProductoService } from 'src/app/shared/model/service/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss']
})
export class EditarProductoComponent implements OnInit{
  errMsj:string = '';
  producto?: Producto;
  id?:number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private toastr:ToastrService,
  ){}

  ngOnInit(): void {
      this.id = this.activatedRoute.snapshot.params['id'];
      this.getDetall();

  }

  getDetall(){
    this.productoService.detail(this.id!).subscribe({
      next: (data)=>{
        this.producto = data;
      },
      error:(err)=>{
        this.router.navigate(['/']);
      }

    })
  }

  onUpdate():void{
    this.productoService.update(this.id!,this.producto!).subscribe({
      next: (data)=>{
        this.toastr.success("Los cambios que has solicitado están hechos " , 'Editado con éxito', {
          timeOut:3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/lista'])
      },
      error:(err)=>{
        this.errMsj = err.error!=null? err.error.mensaje: "No se ha actualizado";
        this.toastr.error(this.errMsj +" 😒", 'Se ha encontrado un problema al intentar hacer el update', {
        timeOut: 3000, positionClass: 'toast-top-center'
    })
    this.router.navigate(['/lista']);
      }

    });
  }
}
