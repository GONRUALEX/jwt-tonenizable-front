import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productos: Product[] =[
    new Product(1, "Star Wars Jedi: Survivor ", "Videojuegos | Castellano", "50", "https://m.media-amazon.com/images/I/71zi+tZvEtL._AC_SX569_.jpg"),
    new Product(2, "Need for Speed Unbound PS5", "Videojuegos | Castellano", "29.99", "https://m.media-amazon.com/images/I/81MwT1FJU7L.__AC_SX300_SY300_QL70_ML2_.jpg"),
    new Product(3, "Quantum Error - PS5", "Videojuegos | Castellano", "51.87", "https://m.media-amazon.com/images/I/81LlwBuiBeL.__AC_SX300_SY300_QL70_ML2_.jpg"),
    new Product(4, "Dead Space PS5", "Videojuegos | Castellano", "63.99", "https://m.media-amazon.com/images/I/714hHWpIP4L.__AC_SX300_SY300_QL70_ML2_.jpg"),
    new Product(5, "UBISOFT Far Cry 6 Spa Ps5", "Videojuegos | Castellano", "17.99", "https://m.media-amazon.com/images/I/81q05karjcS._AC_SX679_.jpg"),
    new Product(6, "Final Fantasy XVI Amazon Ed", "Videojuegos | Castellano", "75.42", "https://m.media-amazon.com/images/I/813NYaIG2uL._AC_SX569_.jpg"),
    new Product(7, "Battlefield 2042 PS5", "Videojuegos | Castellano", "15.58", "https://m.media-amazon.com/images/I/81zAwK33ZRL._AC_SX569_.jpg"),
  ]
  constructor() { }

  getProducts(): Observable<Product[]>{
    return of(this.productos);
  }
}
