import { Observable } from 'rxjs';
import { DashboardService } from './../_servicos/resultados/dashboard.service';
import { DataReponse } from './../_modelos/data-response';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()  
export class RespostaResultados implements Resolve<DataReponse> {  
  constructor(private dashboardService: DashboardService) {}  
  
  resolve(route: ActivatedRouteSnapshot): Observable<DataReponse> {  
    return this.dashboardService.buscarResultadoGeral();
  }  
}  