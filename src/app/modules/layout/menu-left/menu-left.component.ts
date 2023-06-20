import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.css']
})
export class MenuLeftComponent implements OnInit {

  displayTipoAposta = false;
  displayContato = false;
  displayAplicativo = false;
  displayRegras = false;

  constructor(public authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {

  }

  verificarAutorizacoes(permissao: string) {
    return this.authService.verificaPermissao(permissao);
  }

  candidatosPorEstado(){
    this.router.navigate(['/pages/candidatos-doadores']);
  }

  candidatosPorImcFaixaEtaria(){
    this.router.navigate(['/pages/candidatos-imc']);
  }

  candidatosObesosPorGenero(){
    this.router.navigate(['/pages/candidatos-obesos']);
  }

  candidatosMediaIdadeTipoSanguineo(){
    this.router.navigate(['/pages/candidatos-media-idade']);
  }

  candidatosDoadoresTipoSanguineo(){
    this.router.navigate(['/pages/candidatos-tipo-doador']);
  }

}
