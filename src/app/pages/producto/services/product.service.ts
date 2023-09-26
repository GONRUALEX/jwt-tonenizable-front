import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Producto } from 'src/app/shared/model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts(): Observable<Producto[]>{
    return of([]);
  }
}
