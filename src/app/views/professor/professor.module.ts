import { MathModule } from './../../_math/math.module';
import { SharedComponentsModule } from './../../shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from 'ng-sidebar';
import { ProfBaseComponent } from './prof-base/prof-base.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessorRoutingModule } from './professor-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalasComponent } from './salas/salas.component';
import { CountdownModule } from 'ngx-countdown';



@NgModule({
  declarations: [ ProfBaseComponent,DashboardComponent, SalasComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfessorRoutingModule,
    SharedComponentsModule,
    SidebarModule.forRoot(),
    MathModule.forRoot(),
    CountdownModule
  ]
})
export class ProfessorModule { }
