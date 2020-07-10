import { AutenticacaoService } from './../_servicos/login/autenticacao.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

/*Verificado*/
@Injectable({ providedIn: 'root' })
export class GuardaAutenticacao implements CanActivate {
    constructor(
        private roteador: Router,
        private autenticacaoService: AutenticacaoService
    ) { }

    canActivate(rota: ActivatedRouteSnapshot, estado: RouterStateSnapshot) {
        const usuarioAtual = this.autenticacaoService.valorUsuarioAtual;
        if (usuarioAtual) {
            if (rota.data.roles && rota.data.roles.indexOf(usuarioAtual.tipoUsuario) === -1) {
                this.roteador.navigate(['/login']);
                return false;
               
            }
            return true;
        }

        this.roteador.navigate(['/login'], { queryParams: { returnUrl: estado.url } });
        return false;
    }
}