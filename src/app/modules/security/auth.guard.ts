import { AuthService } from './../../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.auth.verificarAcessoUsuario()) {
        this.auth.logout();
        return false;
      } else if (next.data.roles && !this.auth.verificaVariasPermissoes(next.data.roles)) {
        this.auth.semPermissão();
        return false;
      }

      return true;
  }
}
