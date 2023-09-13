import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/model/producto';
import { ProductoService } from 'src/app/service/producto.service';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.scss']
})
export class ListaProductoComponent implements OnInit{

  productos: Producto[] = [];
  isAdmin: boolean = false;

  constructor(private productoService: ProductoService, private router: Router, private tokenService: TokenService){}

  ngOnInit(){
    this.cargarProductos();
    this.isAdmin = this.tokenService.isAdmin();
  }

  styleTh():string{
    return "color:whitesmoke;background-color:rgba("+this.randomNumber(255).toString()+","+this.randomNumber(255).toString()+","+this.randomNumber(255).toString()+")";
  }

  randomNumber(multiplicate: number):number{
    return Math.floor(Math.random()*multiplicate);
  }
  cargarProductos(): void{
    this.productoService.lista().subscribe(
      (data)=>{
        this.productos = data;
      },
      (err)=>{
        console.log("Error al cargar la lista" , err)
      }
    )
  }

  borrar(id:number){
    this.productoService.delete(id).subscribe((data)=>{
      this.cargarProductos();
    });

  }
}
