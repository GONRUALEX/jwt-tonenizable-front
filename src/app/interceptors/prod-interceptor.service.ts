import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, concatMap, throwError } from 'rxjs';
import { TokenService } from '../service/token.service';
import { ToastrService } from 'ngx-toastr';
import { JwtDTO } from '../model/jwt-dto';
import { AuthService } from '../service/auth.service';

const AUTHORIZATION = 'Authorization';
@Injectable({
  providedIn: 'root',
})
export class ProdInterceptorService implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    public toastr: ToastrService,
    private authService: AuthService
  ) {}

  private processRequestError(
    error: HttpErrorResponse,
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('auth interceptor called');
    console.log(error)
    if (error instanceof HttpErrorResponse && error.status === 401) {
      console.log('refrescando token');
      let intReq = request;
      const dto: JwtDTO = new JwtDTO(this.tokenService.getToken()!);
      return this.authService.refresh(dto).pipe(
        concatMap((data: any) => {
          this.tokenService.setToken(data.token);
          intReq = this.addToken(request, data.token);
          return next.handle(intReq);
        })
      );
    }
    this.tokenService.logOut();
    return throwError(() => {
      error;
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.tokenService.isLogged()) {
      return next.handle(req);
    }
    let intReq = req;
    const token = this.tokenService.getToken();

    intReq = this.addToken(req, token!);

    return next
      .handle(intReq)
      .pipe(
        catchError((error: HttpErrorResponse) =>{
          console.log(error, "error")
          return this.processRequestError(error, req, next)
        })
      );
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set(AUTHORIZATION, 'Bearer ' + token),
    });
  }
}

export const interceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: ProdInterceptorService, multi: true },
];
