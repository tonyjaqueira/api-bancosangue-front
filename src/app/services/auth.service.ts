import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageHandlerService } from './message-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuarioDTO } from '../model/dto/UsuarioDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  localUrl: string;

  constructor(private http: HttpClient,
              private erroHandler: MessageHandlerService,
              private jwtHelper: JwtHelperService,
              private rotas: Router,
              private activeRouter: ActivatedRoute,
              private handler: HttpBackend,
              private spinnerService: NgxSpinnerService) {

    this.localUrl = `${environment.apiUrl}/banco-sangue/auth/login`;
    this.carregarToken();

  }

  jwtPayLoad: any;

  // cabeçalhos
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials: false
  };

  logar(usuario: string, senha: string) {
    var usuarioDTO = new UsuarioDTO();
    usuarioDTO.username = usuario;
    usuarioDTO.password = senha;
    return this.http.post<any>(`${this.localUrl}`, JSON.stringify(usuarioDTO), this.httpOptions);
  }

  armazenarToken(token: string) { // armazena o token no storage do navegador
    this.jwtPayLoad = this.jwtHelper.decodeToken(token);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('usuario', this.jwtPayLoad.sub);
    sessionStorage.setItem('login', this.jwtPayLoad.sub);
    return this.jwtPayLoad;
  }

  private carregarToken() {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.armazenarToken(token);
    }
  }

  setarMenu(menu: string) {
      sessionStorage.setItem('menu', menu);
  }

  semPermissão() {
    this.rotas.navigate(['/pagina-nao-autorizada']);
  }

  login() {
    sessionStorage.clear();
    this.jwtPayLoad = null;
    this.rotas.navigate(['/login']);
  }

  logout() {
    sessionStorage.clear();
    this.jwtPayLoad = null;
    this.rotas.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  limparLocalStorage() {
    sessionStorage.clear();
  }

  irHome() {
    this.rotas.navigate(['/pages/principal']).then(() => {
      window.location.reload();
    });
  }

  verificaPermissao(permissao: string) {
    // se tiver retorna true, caso contrario false.
    // verifica se existe um PAYLOAD, se for undefined não valida, e o autorities.include verifica se a permissão que passamos existe
    return this.jwtPayLoad && this.jwtPayLoad.authorities.includes(permissao);
  }

  verificaVariasPermissoes(roles: any) {
    for (const role of roles) {
      if (this.verificaPermissao(role)) {
        return true;
      }
    }

    return false;
  }

  verificaValidadeToken(token: string) {
  return this.jwtHelper.isTokenExpired(token);
  }

  verificarAcessoUsuario() {
    const token = sessionStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

}
