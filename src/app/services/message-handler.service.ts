import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageHandlerService {

  constructor(private messageService: MessageService) { }

  handler(errorResponse: any) {
    console.log(errorResponse);
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    console.log(error.status);
    let mensagemAmigavel = 'Ocorreu um erro ao tentar fazer a requisição. Por favor contate o responsável pelo sistema';
    if (error.status === 403) {
      mensagemAmigavel = 'Usuário não possui permissão para efetuar a requisição';
    }

    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = 'Erro do lado do cliente (browser)';
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    this.messageService.add({severity: 'error', summary: 'Atenção!', detail: mensagemAmigavel});
    // return throwError(mensagemAmigavel);
  }

  // Severidadade = success, info, warn, error
  handleGenericoErro(error: HttpErrorResponse, mensagem: string, severidade: string) {
    let errorMessage = '';
    if (error.status === 403) {
      errorMessage = 'Usuário não permissão para efetuar a requisição';
    }
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(error);
    console.log(errorMessage);
    this.messageService.add({severity: severidade, summary: 'Atenção!', detail: mensagem});
  }

  sucessoMensagem(mensagem: string) {
    this.messageService.add({severity: 'success', summary: 'Sucesso!', detail: mensagem});
  }

  informacaoMensagem(mensagem: string) {
    this.messageService.add({severity: 'info', summary: 'Informnação!', detail: mensagem});
  }

}
