import { AutenticacaoService } from '../login/autenticacao.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

/**
 * Classe responsável pelo controle de Rota, permitindo que o usuário só acesse apenas os seus componentes
 */

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private autenticacaoService: AutenticacaoService, private router: Router) { }

  /**
   * Método para definir se um usuário pode acessar a rota
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const usuario = this.autenticacaoService.getUsuario;
    if (usuario) {
      if (route.data.roles == usuario.TipoUsuario) {
        return true;
      }
    }

    this.router.navigate(['/login']);
    return false;
  }

}

