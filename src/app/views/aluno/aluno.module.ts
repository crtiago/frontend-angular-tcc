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
import { SimuladoPersonalizadoComponent } from './simulado-personalizado/simulado-personalizado.component';
import { CountdownModule } from 'ngx-countdown';
import { KatexModule } from 'ng-katex';


@NgModule({
  declarations: [DashboardComponent, SimuladoComponent, SalaComponent, AlunoBaseComponent, SimuladoGeradoComponent, SimuladoPersonalizadoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlunoRoutingModule,
    SharedComponentsModule,
    SidebarModule.forRoot(),
    MatProgressBarModule,
    CountdownModule,
    KatexModule
  ]
})
export class AlunoModule { }
