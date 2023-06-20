import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CandidatoService } from 'src/app/services/candidato.service';
import { MessageHandlerService } from 'src/app/services/message-handler.service';

@Component({
  selector: 'app-candidato-doador-tipo-sanguineo',
  templateUrl: './candidato-doador-tipo-sanguineo.component.html',
  styleUrls: ['./candidato-doador-tipo-sanguineo.component.css']
})
export class CandidatoDoadorTipoSanguineoComponent implements OnInit {

  data: any;

  constructor(public authService: AuthService,
              private candidatoService: CandidatoService,
              private messageService: MessageHandlerService) { }

  ngOnInit(): void {
    this.listarCandidatosDoaresTipoSanguineo();
  }

  listarCandidatosDoaresTipoSanguineo(){
    this.candidatoService.candidatosDoadorTipoSanguineo().subscribe(listaResultado => {
      var listaTipoSanguineo = listaResultado.map(candidatos => candidatos.tipoSanguineo);
      var listaQuantidade = listaResultado.map(candidatos => candidatos.quantidade);
     this.data = this.candidatoService.gerarGraficoDoughnut(listaQuantidade, listaTipoSanguineo)
    }, error =>{
      this.messageService.handleError(error);
    });
  }


  verificarAcessoUsuario(){
    return this.authService.verificarAcessoUsuario();
  }

}
