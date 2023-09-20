import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../model/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private httpClient:HttpClient) { }

  public lista(): Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(environment.apiUrl+'lista');
  }

  public detail(id:number):Observable<Producto>{
    return this.httpClient.get<Producto>(environment.apiUrl+`detail/${id}`);
  }

  public detailName(nombre:string):Observable<Producto>{
    return this.httpClient.get<Producto>(environment.apiUrl+`detailName/${nombre}`);
  }

  public save(producto:Producto):Observable<any>{
    return this.httpClient.post<any>(environment.apiUrl+'create', producto);
  }

  public update(id:number, producto:Producto,):Observable<any>{
    return this.httpClient.put<any>(environment.apiUrl+`update/${id}`,producto);
  }

  public delete(id:number):Observable<any>{
    return this.httpClient.delete<any>(environment.apiUrl+`delete/${id}`);
  }
}
