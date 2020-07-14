import { RouteGuardService } from './_helpers/route-guard.service';
import { LoginComponent } from './views/login/login.component';
import { Funcao } from './_enuns/funcao';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'prof',
    canActivate : [RouteGuardService],
    loadChildren: () => import('./views/professor/professor.module').then(m => m.ProfessorModule),
    data: { roles: [Funcao.Professor] }
  },
  {
    path: 'aluno',
    canActivate : [RouteGuardService],
    loadChildren: () => import('./views/aluno/aluno.module').then(m => m.AlunoModule),
    data: { roles: [Funcao.Aluno] }
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
