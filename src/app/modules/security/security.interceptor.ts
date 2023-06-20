import { AuthService } from './../../services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { JwtInterceptor } from '@auth0/angular-jwt';
import { MessageHandlerService } from 'src/app/services/message-handler.service';


// classe responsável por interceptar todas as requsisções e incrmentar o token no header das requsisições
const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {

  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private auth: AuthService,
              private erroHandler: MessageHandlerService,
              private jwtInterceptor: JwtInterceptor) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
      let authReq = req;
      let token = sessionStorage.getItem('token');

      if (token != null) {
          authReq = this.injection(req, token);
      }

      return next.handle(authReq).pipe(
        catchError((err, caught) => {
          //aqui podemos tratar os erros caso seja necessário.
          return throwError(err);
        })
      );

  }

  injection(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: SecurityInterceptor, multi: true }
  // poderia ser declarado os providers direto nio segurança.moule sem precisar exportar essa variavel com os providers
];
