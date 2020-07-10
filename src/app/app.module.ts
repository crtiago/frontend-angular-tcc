import { GuardaAutenticacao } from './_helpers/guarda-autenticacao';
import { AutenticacaoService } from './_servicos/login/autenticacao.service';
import { LoginComponent } from './views/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeProfessorComponent } from './views/professor/home-professor/home-professor.component';
import { HomeAlunoComponent } from './views/aluno/home-aluno/home-aluno.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeProfessorComponent,
    HomeAlunoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AutenticacaoService,
    GuardaAutenticacao
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
