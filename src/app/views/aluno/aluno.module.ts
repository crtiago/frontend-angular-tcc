import { SimuladoCriarComponent } from './simulado-criar/simulado-criar.component';
import { ListaSimuladosComponent } from './lista-simulados/lista-simulados.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedComponentsModule } from './../../shared-components.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunoRoutingModule } from './aluno-routing.module';

import { SidebarModule } from 'ng-sidebar';
import { ListaSalasComponent } from './lista-salas/lista-salas.component';
import { AlunoBaseComponent } from './aluno-base/aluno-base.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimuladoGeradoComponent } from './simulado-gerado/simulado-gerado.component';
import { CountdownModule } from 'ngx-countdown';
import { KatexModule } from 'ng-katex';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { GabaritoComponent } from './gabarito/gabarito.component';
import { SimuladoConcluidoComponent } from './simulado-concluido/simulado-concluido.component';
import { ListaSimuladosSalaComponent } from './lista-simulados-sala/lista-simulados-sala.component';


@NgModule({
  declarations: [DashboardComponent, SimuladoCriarComponent, ListaSalasComponent, AlunoBaseComponent, SimuladoGeradoComponent, ListaSimuladosComponent, GabaritoComponent, SimuladoConcluidoComponent, ListaSimuladosSalaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlunoRoutingModule,
    SharedComponentsModule,
    SidebarModule.forRoot(),
    MatProgressBarModule,
    CountdownModule,
    KatexModule,
    LazyLoadImageModule
  ]
})
export class AlunoModule { }
