import { ListaSimuladosComponent } from './lista-simulados/lista-simulados.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedComponentsModule } from './../../shared-components.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunoRoutingModule } from './aluno-routing.module';

import { SidebarModule } from 'ng-sidebar';
import { SimuladoComponent } from './simulado/simulado.component';
import { SalaComponent } from './sala/sala.component';
import { AlunoBaseComponent } from './aluno-base/aluno-base.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimuladoGeradoComponent } from './simulado-gerado/simulado-gerado.component';
import { CountdownModule } from 'ngx-countdown';
import { KatexModule } from 'ng-katex';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { GabaritoComponent } from './gabarito/gabarito.component';
import { SimuladoConcluidoComponent } from './simulado-concluido/simulado-concluido.component';


@NgModule({
  declarations: [DashboardComponent, SimuladoComponent, SalaComponent, AlunoBaseComponent, SimuladoGeradoComponent, ListaSimuladosComponent, GabaritoComponent, SimuladoConcluidoComponent],
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
