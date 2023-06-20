import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CandidatoService } from 'src/app/services/candidato.service';
import { MessageHandlerService } from 'src/app/services/message-handler.service';

@Component({
  selector: 'app-candidato-obesos',
  templateUrl: './candidato-obesos.component.html',
  styleUrls: ['./candidato-obesos.component.css']
})
export class CandidatoObesosComponent implements OnInit {

  data: any;

  constructor(public authService: AuthService,
              private candidatoService: CandidatoService,
              private messageService: MessageHandlerService) { }

  ngOnInit(): void {
    this.listarCandidatosObesesPorGenero();
  }

  listarCandidatosObesesPorGenero(){
    this.candidatoService.candidatosObesesPorGenero().subscribe(resultado => {
     const percentualFeminino = resultado.Feminino;
     const percentualMasculino = resultado.Masculino;
     let listaGenero: Array<string> = ['Feminino','Masculino'];
     let listaQuantitativo: Array<number> = [percentualFeminino,percentualMasculino];
     this.data = this.candidatoService.gerarGraficoPizza(listaQuantitativo, listaGenero, 'Percentual de obeses por gênero')
    }, error =>{
      this.messageService.handleError(error);
    });
  }


  verificarAcessoUsuario(){
    return this.authService.verificarAcessoUsuario();
  }

}
