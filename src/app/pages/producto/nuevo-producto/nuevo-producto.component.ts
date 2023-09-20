import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/shared/model/producto';
import { ProductoService } from '../../../shared/service/producto.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.scss'],
})
export class NuevoProductoComponent implements OnInit {
  errMsj: string = '';
  nombre = '';
  precio?: number;

  constructor(
    private ProductoService: ProductoService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {}

  onCreate(): void {
    const producto = new Producto(this.nombre, this.precio!);
    this.ProductoService.save(producto).subscribe({
      next: (data) => {
        this.router.navigate(['/lista']);
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
        this.router.navigate(['/lista']);
      },
    });
  }
}
