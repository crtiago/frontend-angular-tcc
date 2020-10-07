import { UtilMetodos } from './_helpers/util-metodos';
import { CadastroComponent } from './views/utils/cadastro/cadastro.component';
import { RouteGuardService } from './_servicos/rota/route-guard.service';
import { LoginComponent } from './views/utils/login/login.component';
import { Funcao } from './_enuns/funcao';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'cadastro', component: CadastroComponent,
    resolve: {
      response: UtilMetodos
    }
  },
  {
    path: 'prof',
    canActivate: [RouteGuardService],
    loadChildren: () => import('./views/professor/professor.module').then(m => m.ProfessorModule),
    data: { roles: [Funcao.Professor] }
  },
  {
    path: 'aluno',
    canActivate: [RouteGuardService],
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
