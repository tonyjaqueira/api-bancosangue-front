import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CandidatoService } from 'src/app/services/candidato.service';
import { MessageHandlerService } from 'src/app/services/message-handler.service';

@Component({
  selector: 'app-candidato-media-idade',
  templateUrl: './candidato-media-idade.component.html',
  styleUrls: ['./candidato-media-idade.component.css']
})
export class CandidatoMediaIdadeComponent implements OnInit {

  data: any;

  constructor(public authService: AuthService,
              private candidatoService: CandidatoService,
              private messageService: MessageHandlerService) { }

  ngOnInit(): void {
    this.listarCandidatosMediaIdadeTipoSanguineo();
  }

  listarCandidatosMediaIdadeTipoSanguineo(){
    this.candidatoService.candidatosMediaIdadeTipoSanguineo().subscribe(listaResultado => {
      var listaTipoSanguineo = listaResultado.map(candidatos => candidatos.tipoSanguineo);
      var listaMediaIdade = listaResultado.map(candidatos => candidatos.mediaIdade);
     this.data = this.candidatoService.gerarGraficoPolar(listaMediaIdade, listaTipoSanguineo)
    }, error =>{
      this.messageService.handleError(error);
    });
  }


  verificarAcessoUsuario(){
    return this.authService.verificarAcessoUsuario();
  }


}
