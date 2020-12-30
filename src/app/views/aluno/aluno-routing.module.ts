import { ListaSimuladosSalaComponent } from './lista-simulados-sala/lista-simulados-sala.component';
import { RespostaListaSalas } from './../../_helpers/resposta-lista-salas';
import { SimuladoCriarComponent } from './simulado-criar/simulado-criar.component';
import { SimuladoConcluidoComponent } from './simulado-concluido/simulado-concluido.component';
import { GabaritoComponent } from './gabarito/gabarito.component';
import { RespostaResultados } from './../../_helpers/resposta-resultados';
import { RespostaCadastro } from './../../_helpers/resposta-cadastro';
import { RespostaListaSimulados } from './../../_helpers/resposta-lista-simulados';
import { ListaSimuladosComponent } from './lista-simulados/lista-simulados.component';
import { DeactivateGuardService } from './../../_servicos/rota/deactivate-guard.service';
import { SimuladoGeradoComponent } from './simulado-gerado/simulado-gerado.component';
import { ConfiguracoesComponent } from './../utils/configuracoes/configuracoes.component';
import { SuporteComponent } from './../utils/suporte/suporte.component';
import { AlunoBaseComponent } from './aluno-base/aluno-base.component';
import { ListaSalasComponent } from './lista-salas/lista-salas.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', component: AlunoBaseComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard', component: DashboardComponent, resolve: {
          respostaResultados: RespostaResultados
        }, data: { title: 'Dashboard' }
      },
      { path: 'simulado', component: SimuladoCriarComponent, data: { title: 'Simulado' } },
      {
        path: 'simuladogerado', component: SimuladoGeradoComponent, canActivate: [DeactivateGuardService], canDeactivate: [DeactivateGuardService], data: { title: 'Simulado Gerado' }
      },
      {
        path: 'simuladoconcluido', component: SimuladoConcluidoComponent, data: { title: 'Simulado Concluído' }
      },
      {
        path: 'listasimulados', component: ListaSimuladosComponent, resolve: {
          response: RespostaListaSimulados
        }, data: { title: 'Simulados' }
      },
      {
        path: 'gabarito', component: GabaritoComponent, data: { title: 'Gabarito' }
      },
      {
        path: 'salas', component: ListaSalasComponent, resolve: {
          response: RespostaListaSalas
        }, data: { title: 'Salas' }
      },
      {
        path: 'listasimuladossala', component: ListaSimuladosSalaComponent, data: { title: 'Simulados da Sala' }
      },
      {
        path: 'configuracoes', component: ConfiguracoesComponent, resolve: {
          response: RespostaCadastro
        }, data: { title: 'Configurações' }
      },
      { path: 'suporte', component: SuporteComponent, data: { title: 'Suporte' } },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlunoRoutingModule { }
