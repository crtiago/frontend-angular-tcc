import { SuporteComponent } from './suporte/suporte.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
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
      { path: 'configuracoes', component: ConfiguracoesComponent },
      { path: 'suporte', component: SuporteComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessorRoutingModule { }
