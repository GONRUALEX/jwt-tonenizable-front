import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NuevoUsuario } from '../../shared/model/nuevo-usuario';
import { Observable } from 'rxjs';
import { LoginUsuario } from '../../shared/model/login-usuario';
import { JwtDTO } from '../../shared/model/jwt-dto';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = environment.authUrl;

  constructor(private httpClient: HttpClient) { }

  public nuevo(nuevoUsuario: NuevoUsuario):Observable<any>{
    return this.httpClient.post<any>(this.authUrl+'nuevo', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario):Observable<JwtDTO>{
    return this.httpClient.post<JwtDTO>(this.authUrl+'login', loginUsuario);
  }

  public refresh(dto: JwtDTO):Observable<JwtDTO>{
    return this.httpClient.post<JwtDTO>(this.authUrl+'refresh', dto);
  }
}
