import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/shared/model/product';
import { ProductoService } from '../services/producto.service';


@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.scss'],
})
export class NuevoProductoComponent implements OnInit {
  errMsj: string = '';
  nombre = '';
  precio?: number;
  descripcion: string;
  imageUrl: string;

  constructor(
    private ProductoService: ProductoService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {}

  onCreate(): void {
    const producto: Producto ={"name":this.nombre, "description":this.descripcion, "price":this.precio!.toString(), "imageUrl":this.imageUrl};
    this.ProductoService.save(producto).subscribe({
      next: (data) => {
        this.router.navigate(['/mantenimiento/lista']);
        this.toastr.success(
          'Nuevo producto añadido ',
          'Añadido con éxisto',
          {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          }
        );
      },
      error: (err) => {
        this.errMsj =
          err.error != null ? err.error.mensaje : 'No se ha podido añadir';
        this.toastr.error(
          this.errMsj + ' 😒',
          'Se ha encontrado un problema al añadir el producto',
          {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          }
        );
        this.router.navigate(['/mantenimiento/lista']);
      },
    });
  }
}
