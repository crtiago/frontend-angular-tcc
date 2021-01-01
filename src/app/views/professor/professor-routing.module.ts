import { ListaAlunosSalaComponent } from './lista-alunos-sala/lista-alunos-sala.component';
import { GabaritoProfComponent } from './gabarito-prof/gabarito-prof.component';
import { CriarSimuladoSalaComponent } from './criar-simulado-sala/criar-simulado-sala.component';
import { ListaSimuladosSalaComponent } from './lista-simulados-sala/lista-simulados-sala.component';
import { RespostaListaSalas } from './../../_helpers/resposta-lista-salas';
import { CriarSalaComponent } from './criar-sala/criar-sala.component';
import { RespostaCadastro } from './../../_helpers/resposta-cadastro';
import { ConfiguracoesComponent } from './../utils/configuracoes/configuracoes.component';
import { SuporteComponent } from './../utils/suporte/suporte.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListaSalasComponent } from './lista-salas/lista-salas.component';
import { ProfBaseComponent } from './prof-base/prof-base.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  {
    path: '', component: ProfBaseComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
      {
        path: 'salas', resolve: {
          response: RespostaListaSalas
        }, component: ListaSalasComponent, data: { title: 'Salas' }
      },
      { path: 'listasimuladossala', component: ListaSimuladosSalaComponent, data: { title: 'Simulados da Sala' } },
      { path: 'criarsala', component: CriarSalaComponent, data: { title: 'Salas' } },
      { path: 'criarsimulado', component: CriarSimuladoSalaComponent, data: { title: 'Criar Simulado' } },
      { path: 'alunossimulado', component: ListaAlunosSalaComponent, data: { title: 'Alunos do Simulado' } },
      { path: 'gabarito', component: GabaritoProfComponent, data: { title: 'Gabarito' } },
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
