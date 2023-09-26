import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Producto } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  message: Subject<Producto> = new Subject();
  constructor() { }

  sendMessage(product: Producto):void{
    this.message.next(product);
  } 

  getMessage():Observable<any>{
    return this.message.asObservable();
  }
}
