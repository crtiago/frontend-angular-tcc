import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunoRoutingModule } from './aluno-routing.module';

import { SidebarModule } from 'ng-sidebar';
import { SimuladoComponent } from './simulado/simulado.component';
import { SalaComponent } from './sala/sala.component';
import { AlunoBaseComponent } from './aluno-base/aluno-base.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { SuporteComponent } from './suporte/suporte.component';


@NgModule({
  declarations: [DashboardComponent, SimuladoComponent, SalaComponent, AlunoBaseComponent, ConfiguracoesComponent, SuporteComponent,],
  imports: [
    CommonModule,
    AlunoRoutingModule,
    SidebarModule.forRoot()
  ]
})
export class AlunoModule { }
