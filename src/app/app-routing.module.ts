import { GuardaAutenticacao } from './_helpers/guarda-autenticacao';
import { LoginComponent } from './views/login/login.component';
import { Funcao } from './_enuns/funcao';
import { HomeProfessorComponent } from './views/professor/home-professor/home-professor.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeAlunoComponent } from './views/aluno/home-aluno/home-aluno.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [GuardaAutenticacao],
  },
  {
    path: 'homealuno',
    component: HomeAlunoComponent,
    canActivate: [GuardaAutenticacao],
    data: { roles: [Funcao.Aluno] }
  },
  {
    path: 'homeprofessor',
    component: HomeProfessorComponent,
    canActivate: [GuardaAutenticacao],
    data: { roles: [Funcao.Professor] }
  },

  
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
