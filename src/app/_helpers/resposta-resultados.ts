import { map, withLatestFrom } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { DashboardService } from './../_servicos/resultados/dashboard.service';
import { DataReponse } from './../_modelos/data-response';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class RespostaResultados implements Resolve<[any]> {
  constructor(private dashboardService: DashboardService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    return this.dashboardService.buscarUltimosResultados().pipe(
      withLatestFrom(
        this.dashboardService.buscarResultadoGeral()
      )
    );
  }
}  