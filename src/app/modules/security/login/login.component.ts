import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MessageHandlerService } from 'src/app/services/message-handler.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Usuario } from 'src/app/model/Usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService, AuthService, MessageHandlerService, JwtHelperService]
})
export class LoginComponent implements OnInit {

  constructor(private messageService: MessageService,
              private auttenticacaoSerice: AuthService,
              private errorHandler: MessageHandlerService,
              private rotas: Router,
              private spinnerService: NgxSpinnerService) {}

usuario = new Usuario();

  ngOnInit(): void {
    this.limparLocalStorage();
  }


  logar(form: NgForm) {

    this.usuario.login = form.value.login;
    this.usuario.senha = form.value.senhaUsuario;

    if (this.usuario.login === undefined || this.usuario.senha === undefined) {
      this.messageService.add({severity: 'info', summary: 'Atenção!', detail: 'Informe os dados necessários'});
    } else {
        this.spinnerService.show();
        this.auttenticacaoSerice.logar(this.usuario.login, this.usuario.senha).subscribe((response: any) => {
        this.auttenticacaoSerice.armazenarToken(response.accessToken);
        this.auttenticacaoSerice.irHome();
      }, erro => {
        this.spinnerService.hide();
        sessionStorage.clear(); // limpa o local storage
        switch (erro.status) {
          case 400:
            if (erro.error.error === 'invalid_grant') {
              this.errorHandler.handleGenericoErro(erro, 'Login ou senha inválidos!', 'info');
             } else {
              this.errorHandler.handleGenericoErro(erro, 'Ocorreu um erro ao tentar efetuar o login!', 'error');
             }
            break;
          default:
            this.errorHandler.handleGenericoErro(erro, 'Ocorreu um erro ao tentar efetuar o login!', 'error');
            break;
        }
      });
    }
  }


  limparLocalStorage() {
    this.auttenticacaoSerice.limparLocalStorage();
  }

  irHome() {
    this.auttenticacaoSerice.irHome();
  }

}
