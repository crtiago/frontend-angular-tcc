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
  },
  {
    path: 'homealuno',
    component: HomeAlunoComponent,
  },
  {
    path: 'homeprofessor',
    component: HomeProfessorComponent,
  },

  
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
