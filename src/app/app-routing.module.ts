import { TemplateComponent } from './modules/pages/template/template.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/security/login/login.component';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: '', component: TemplateComponent},
    {path: 'login', component: LoginComponent},
    {path: 'pages', loadChildren: () => import('./modules/pages/pages.module').then(m => m.PagesModule)}
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
