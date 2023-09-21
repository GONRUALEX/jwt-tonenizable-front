import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productos: Product[] =[
    new Product(1, "SKYLYM", "MARAVILLOSA ADAPATCIÓN", "23,56", "https://m.media-amazon.com/images/I/911Upgsj-kL._AC_SY879_.jpg"),
    new Product(2, "Fallout", "MARAVILLOSA ADAPATCIÓN", "23,56", "https://m.media-amazon.com/images/I/911Upgsj-kL._AC_SY879_.jpg"),
    new Product(3, "farcry", "MARAVILLOSA ADAPATCIÓN", "23,56", "https://m.media-amazon.com/images/I/911Upgsj-kL._AC_SY879_.jpg"),
    new Product(4, "red redemption", "MARAVILLOSA ADAPATCIÓN", "23,56", "https://m.media-amazon.com/images/I/911Upgsj-kL._AC_SY879_.jpg"),
    new Product(5, "gta3", "MARAVILLOSA ADAPATCIÓN", "23,56", "https://m.media-amazon.com/images/I/911Upgsj-kL._AC_SY879_.jpg"),
    new Product(6, "gta5", "MARAVILLOSA ADAPATCIÓN", "23,56", "https://m.media-amazon.com/images/I/911Upgsj-kL._AC_SY879_.jpg"),
    new Product(7, "frubys", "MARAVILLOSA ADAPATCIÓN", "23,56", "https://m.media-amazon.com/images/I/911Upgsj-kL._AC_SY879_.jpg"),
  ]
  constructor() { }

  getProducts(): Observable<Product[]>{
    return of(this.productos);
  }
}
