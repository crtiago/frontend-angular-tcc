import { AutenticacaoService } from './../_servicos/login/autenticacao.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

/**
 * Classe responsável pelo controle de Rota, permitindo que o usuário só acesse apenas os seus componentes
 */

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private autenticacaoService: AutenticacaoService, private router: Router) {}

  /**
   * Método para definir se um usuário pode acessar a rota
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    //Variável que recebe o usuário atual que está logado
    const usuario = this.autenticacaoService.getUsuario;

    //Verifica primeiro se o usuário está logado
    if (usuario) {
      //Caso o mesmo esteja logado, ele retorna true para o TipoUsuario
      if (route.data.roles == usuario.TipoUsuario) {
        return true;
      }
    }

    //Se o usuário não estiver logado ele retorna false e navega para a tela de login
    this.router.navigate(['/login']);
    return false;
  }

}

