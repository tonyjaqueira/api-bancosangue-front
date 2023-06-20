import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuarioLogado: string;
  loginusuario: string;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    // console.log(this.authService.jwtPayLoad);
    this.usuarioLogado = sessionStorage.getItem('usuario');
    this.loginusuario = sessionStorage.getItem('login');

  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

}
