import { UtilMetodos } from './../../_helpers/util-metodos';
import { ConfiguracoesComponent } from './../utils/configuracoes/configuracoes.component';
import { SuporteComponent } from './../utils/suporte/suporte.component';
import { AlunoBaseComponent } from './aluno-base/aluno-base.component';
import { SalaComponent } from './sala/sala.component';
import { SimuladoComponent } from './simulado/simulado.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', component: AlunoBaseComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'simulado', component: SimuladoComponent },
      { path: 'sala', component: SalaComponent },
      {
        path: 'configuracoes', component: ConfiguracoesComponent, resolve: {
          response: UtilMetodos
        }
      },
      { path: 'suporte', component: SuporteComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlunoRoutingModule { }
