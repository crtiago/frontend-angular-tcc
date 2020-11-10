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


@NgModule({
  declarations: [DashboardComponent, SimuladoComponent, SalaComponent, AlunoBaseComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlunoRoutingModule,
    SharedComponentsModule,
    SidebarModule.forRoot()
  ]
})
export class AlunoModule { }
