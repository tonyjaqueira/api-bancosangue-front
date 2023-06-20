import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CandidatoService } from 'src/app/services/candidato.service';
import { MessageHandlerService } from 'src/app/services/message-handler.service';

@Component({
  selector: 'app-candidatos-doadores',
  templateUrl: './candidatos-doadores.component.html',
  styleUrls: ['./candidatos-doadores.component.css']
})
export class CandidatosDoadoresComponent implements OnInit {

  data: any;

  constructor(public authService: AuthService,
              private candidatoService: CandidatoService,
              private messageService: MessageHandlerService) { 
  }

  ngOnInit(): void {
    this.listarCandidatosPorEstado();
  }


  listarCandidatosPorEstado(){
    this.candidatoService.candidatosPorEstadoDaFederacao().subscribe(listaResultado => {
      var listaEstados = listaResultado.map(candidatos => candidatos.estado);
      var listaQuantidades = listaResultado.map(candidatos => candidatos.quantidade);
      this.data = this.candidatoService.gerarGrafico(listaQuantidades, listaEstados, 'Candidatos a doação de sangue por estado', '#07209F')
    }, error =>{
      this.messageService.handleError(error);
    });
  }

}
