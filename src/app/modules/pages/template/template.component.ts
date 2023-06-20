import { MessageHandlerService } from '../../../services/message-handler.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, UrlTree } from '@angular/router';

declare var $;

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  exibirMenu: boolean;

  constructor(private router: Router,
              private auttenticacaoSerice: AuthService,
              private errorHandler: MessageHandlerService) { }

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    $('body').addClass('hold-transition skin-purple-light sidebar-mini');
    // aqui se pode trocar as akins de acordo com a preferencia do usuário (skin-purple-light)
    // referencia de DOC https://adminlte.io/docs/2.4/layout
    // https://adminlte.io/blog/customizing-and-downsizing-adminlte-to-match-your-businsess
    // https://adminlte.io/themes/AdminLTE/documentation/index.html
    this.getBanca();
  }

  getBanca() {
    let urlBanca: string[];
    urlBanca = window.location.href.split('/');
    // console.log(urlBanca[2]);
  }

/*
  logarMaster(cpf: string, senha: string) {

    this.auttenticacaoSerice.logar(cpf, senha).subscribe((response: any) => {
      // this.armazernarToken(response);
      this.auttenticacaoSerice.armazenarToken(response.access_token);
      this.auttenticacaoSerice.irHome();
      // this.rotas.navigate(['/home']);
    }, erro => {
      sessionStorage.clear(); // limpa o local storage
      switch (erro.status) {
        case 400:
          if (erro.error.error === 'invalid_grant') {
            this.errorHandler.handleGenericoErro(erro, 'Login ou senha inválidos!', 'info');
           } else {
            this.errorHandler.handleGenericoErro(erro, 'Ocorreu um erro ao tentar carregar o site', 'error');
           }
          break;
        default:
          this.errorHandler.handleGenericoErro(erro, 'Ocorreu um erro ao tentar carregar o site', 'error');
          break;
      }
    });
  }*/

}
