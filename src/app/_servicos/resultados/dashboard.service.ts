import { map } from 'rxjs/operators';
import { AutenticacaoService } from './../login/autenticacao.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  constructor(private http: HttpClient, private autenticacaoService: AutenticacaoService) { }

  buscarResultadoGeral() {
    return this.http.get<any>(`${environment.apiUrl}/BuscarResultadoGeral?idUsuario=${this.autenticacaoService.getUsuario.IdUsuario}`)
      .pipe(
        map(resultados => {
            return resultados;        
        }
        )
      )
  };

  buscarUltimosResultados() {
    return this.http.get<any>(`${environment.apiUrl}/BuscarUltimosResultados?idUsuario=${this.autenticacaoService.getUsuario.IdUsuario}`)
      .pipe(
        map(ultimosResultados => {
          return ultimosResultados;
        }
        )
      )
  };

  buscarResultadosDisciplina() {
    return this.http.get<any>(`${environment.apiUrl}/BuscarDesemepnhoDisciplinas?idUsuario=${this.autenticacaoService.getUsuario.IdUsuario}`)
      .pipe(
        map(desempenhoDisciplina => {
          return desempenhoDisciplina;
        }
        )
      )
  };
}
