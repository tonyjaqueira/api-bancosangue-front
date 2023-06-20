import { PrincipalComponent } from './principal/principal/principal.component';
import { TemplateComponent } from './template/template.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../security/auth.guard';
import { CandidatosDoadoresComponent } from './candidatos/candidatos-doadores/candidatos-doadores.component';
import { CandidatoImcComponent } from './candidatos/candidato-imc/candidato-imc.component';
import { CandidatoObesosComponent } from './candidatos/candidato-obesos/candidato-obesos.component';
import { CandidatoMediaIdadeComponent } from './candidatos/candidato-media-idade/candidato-media-idade.component';
import { CandidatoDoadorTipoSanguineoComponent } from './candidatos/candidato-doador-tipo-sanguineo/candidato-doador-tipo-sanguineo.component';



const routes: Routes = [
  {path: '', component: TemplateComponent, children: [
  {path: '', redirectTo: 'principal', pathMatch: 'full'},
  {path: 'principal', component: PrincipalComponent, canActivate: [AuthGuard]},
  {path: 'candidatos-doadores', component: CandidatosDoadoresComponent, canActivate: [AuthGuard]},
  {path: 'candidatos-imc', component: CandidatoImcComponent, canActivate: [AuthGuard]},
  {path: 'candidatos-obesos', component: CandidatoObesosComponent, canActivate: [AuthGuard]},
  {path: 'candidatos-media-idade', component: CandidatoMediaIdadeComponent, canActivate: [AuthGuard]},
  {path: 'candidatos-tipo-doador', component: CandidatoDoadorTipoSanguineoComponent, canActivate: [AuthGuard]},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
