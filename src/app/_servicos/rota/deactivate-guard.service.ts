import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, Router, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';

/*Classe responsável para evitar que o usuário saia do simulado*/
export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class DeactivateGuardService implements CanDeactivate<CanComponentDeactivate>, CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const idSimulado = sessionStorage.getItem('idSimulado');
    if (idSimulado != null && idSimulado != '') {
      return true;
    }

    this.router.navigate(['aluno/listasimulados']);
    return false;
  }

  canDeactivate(component: CanComponentDeactivate, route: ActivatedRouteSnapshot) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}