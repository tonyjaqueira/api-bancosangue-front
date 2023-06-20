import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CandidatoService } from 'src/app/services/candidato.service';
import { MessageHandlerService } from 'src/app/services/message-handler.service';

@Component({
  selector: 'app-candidato-imc',
  templateUrl: './candidato-imc.component.html',
  styleUrls: ['./candidato-imc.component.css']
})
export class CandidatoImcComponent implements OnInit {

  data: any;

  constructor(public authService: AuthService,
              private candidatoService: CandidatoService,
              private messageService: MessageHandlerService) { }

  ngOnInit(): void {
    this.listarCandidatosImcMedioPorFaixaEtaria();
  }

  
  listarCandidatosImcMedioPorFaixaEtaria(){
    this.candidatoService.candidatosImcMedioPorFaixaEtaria().subscribe(listaResultado => {
      var listaFaixaEtaria = listaResultado.map(candidatos => candidatos.faixaEtaria);
      var listaImc = listaResultado.map(candidatos => candidatos.imc);
      this.data = this.candidatoService.gerarGrafico(listaImc, listaFaixaEtaria, 'Média IMC por faixa etária com intervalos de 10 anos', '#CCCC00')
    }, error =>{
      this.messageService.handleError(error);
    });
  }



  verificarAcessoUsuario(){
    return this.authService.verificarAcessoUsuario();
  }

}
