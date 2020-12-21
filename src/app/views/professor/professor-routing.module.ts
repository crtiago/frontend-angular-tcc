import { RespostaCadastro } from './../../_helpers/resposta-cadastro';
import { ConfiguracoesComponent } from './../utils/configuracoes/configuracoes.component';
import { SuporteComponent } from './../utils/suporte/suporte.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalasComponent } from './salas/salas.component';
import { ProfBaseComponent } from './prof-base/prof-base.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  {
    path: '', component: ProfBaseComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent,data: { title: 'Dashboard' } },
      { path: 'salas', component: SalasComponent, data: { title: 'Salas' }},
      {
        path: 'configuracoes', component: ConfiguracoesComponent,
        resolve: {
          response: RespostaCadastro
        },
        data: { title: 'Configurações' }
      },
      { path: 'suporte', component: SuporteComponent, data: { title: 'Suporte' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessorRoutingModule { }
