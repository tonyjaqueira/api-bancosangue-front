import { DatePipe } from '@angular/common';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { MessageHandlerService } from './message-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  localUrl: string;
  pipe = new DatePipe('pt-BR');
  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }), withCredentials: true
  };


  constructor(private http: HttpClient,
              private erroHandler: MessageHandlerService,
              private authService: AuthService) {

    this.localUrl = `${environment.apiUrl}/banco-sangue/candidato-doador`;

  }

  candidatosPorEstadoDaFederacao() {
    return this.http.get<any[]>(`${this.localUrl}/candidatosPorEstado`);
  }

  candidatosImcMedioPorFaixaEtaria() {
    return this.http.get<any[]>(`${this.localUrl}/candidatosImcMedio`);
  }

  candidatosObesesPorGenero() {
    return this.http.get<any>(`${this.localUrl}/candidatosObesosPorGenero`);
  }

  candidatosMediaIdadeTipoSanguineo() {
    return this.http.get<any[]>(`${this.localUrl}/mediaIdadePorTipoSanguineo`);
  }

  candidatosDoadorTipoSanguineo() {
    return this.http.get<any[]>(`${this.localUrl}/possiveisDoadoresPorTipoSanguineo`);
  }

  gerarGrafico(listaQuantitativo: any[], listaDescricao: any[], descricaoGrafico: string, corGrafico: any) {
    return {
      labels: listaDescricao,
      datasets: [
          {
              label: descricaoGrafico,
              backgroundColor: corGrafico,
              borderColor: '#1E88E5',
              data: listaQuantitativo
          }
      ]
    }
  }

  gerarGraficoPizza(listaQuantitativo: any[], listaDescricao: any[], descricaoGrafico: string) {
    return {
      labels: listaDescricao,
      datasets: [
          {
              label: descricaoGrafico,
              backgroundColor: [
                "#FFCE56",
                "#36A2EB"
              ],
              hoverBackgroundColor: [
                  "#FFCE56",
                  "#36A2EB"
              ],
              data: listaQuantitativo
          }
      ]
    }
  }

  gerarGraficoPolar(listaQuantitativo: any[], listaDescricao: any[]) {
    return {
      datasets: [{
          data: listaQuantitativo,
          backgroundColor: [
              "#FF6384",
              "#4BC0C0",
              "#FFCE56",
              "#E7E9ED",
              "#36A2EB",
              "#CC0000",
              "#606060",
              "#6600CC"
          ],
          label: 'My dataset'
      }],
      labels: listaDescricao
    }
  }

  gerarGraficoDoughnut(listaQuantitativo: any[], listaDescricao: any[]) {
    return {
      labels: listaDescricao,
      datasets: [
          {
              data: listaQuantitativo,
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#E7E9ED",
                  "#36A2EB",
                  "#CC0000",
                  "#606060",
                  "#6600CC"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#E7E9ED",
                  "#36A2EB",
                  "#CC0000",
                  "#606060",
                  "#6600CC"
              ]
          }]    
      };
  }

}
