import { SharedComponentsModule } from './../../shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from 'ng-sidebar';
import { ProfBaseComponent } from './prof-base/prof-base.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessorRoutingModule } from './professor-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListaSalasComponent } from './lista-salas/lista-salas.component';
import { CountdownModule } from 'ngx-countdown';
import { KatexModule } from 'ng-katex';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CriarSalaComponent } from './criar-sala/criar-sala.component';
import { ListaSimuladosSalaComponent } from './lista-simulados-sala/lista-simulados-sala.component';
import { CriarSimuladoSalaComponent } from './criar-simulado-sala/criar-simulado-sala.component';
import { GabaritoProfComponent } from './gabarito-prof/gabarito-prof.component';
import { ListaAlunosSalaComponent } from './lista-alunos-sala/lista-alunos-sala.component';



@NgModule({
  declarations: [ ProfBaseComponent,DashboardComponent, ListaSalasComponent, CriarSalaComponent, ListaSimuladosSalaComponent, CriarSimuladoSalaComponent, GabaritoProfComponent, ListaAlunosSalaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfessorRoutingModule,
    SharedComponentsModule,
    SidebarModule.forRoot(),
    CountdownModule,
    KatexModule,
    LazyLoadImageModule
  ]
})
export class ProfessorModule { }
