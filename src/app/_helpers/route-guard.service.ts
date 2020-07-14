import { Funcao } from './../_enuns/funcao';
import { AutenticacaoService } from './../_servicos/login/autenticacao.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private autenticacaoService: AutenticacaoService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.autenticacaoService.userValue;

    if (user) {
      if (route.data.roles == user.TipoUsuario) {
        return true;
      }
    }

    //Se o usuário não estiver logado ele retorna a tela de login
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }



}

