import { AutenticacaoService } from './../_servicos/login/autenticacao.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private autenticacaoService: AutenticacaoService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const usuario = this.autenticacaoService.userValue;
        if (usuario) {
            // check if route is restricted by role
            if (route.data.tipoUsuario && route.data.roles.indexOf(usuario.tipoUsuario) === -1) {
                
                // role not authorised so redirect to home page
                this.router.navigate(['/login']);
                return false;
            }

            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { retornoUrl: state.url } });
        return false;
    }
}