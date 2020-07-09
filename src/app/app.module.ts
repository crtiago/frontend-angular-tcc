import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeProfessorComponent } from './views/professor/home-professor/home-professor.component';
import { HomeAlunoComponent } from './views/aluno/home-aluno/home-aluno.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeProfessorComponent,
    HomeAlunoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
