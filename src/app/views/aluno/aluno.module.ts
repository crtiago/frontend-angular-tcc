import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunoRoutingModule } from './aluno-routing.module';
import { AlunoHomeComponent } from './aluno-home/aluno-home.component';


@NgModule({
  declarations: [AlunoHomeComponent],
  imports: [
    CommonModule,
    AlunoRoutingModule
  ]
})
export class AlunoModule { }
