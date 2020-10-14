import { UtilMetodos } from './../../_helpers/util-metodos';
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
      { path: 'dashboard', component: DashboardComponent },
      { path: 'salas', component: SalasComponent },
      {
        path: 'configuracoes', component: ConfiguracoesComponent,
        resolve: {
          response: UtilMetodos
        }
      },
      { path: 'suporte', component: SuporteComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessorRoutingModule { }
