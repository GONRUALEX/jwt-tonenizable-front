import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{
  errMsj:string = '';
  products: Product[] = [];
  constructor(private productService: ProductService, private toastr:ToastrService,){}
  ngOnInit():void{
    this.loadProducts();
  }

  loadProducts():void {
    this.productService.getProducts().subscribe({
      next: (data)=>{
        this.products = data;
      },
      error:(err)=>{
        this.errMsj = err.error!=null? err.error.mensaje: "No se ha actualizado";
        this.toastr.error(this.errMsj +" 😒", 'Se ha encontrado un problema al intentar hacer el update', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
    }
    });
  }

}
