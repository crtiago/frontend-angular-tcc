import { AutenticacaoService } from './../login/autenticacao.service';
import { Simulado } from './../../_modelos/simulado';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})


export class SalasService {


    constructor(private router: Router, private http: HttpClient, private autenticacaoService: AutenticacaoService) {
    }

    criarSala(Descricao: string, MaxParticipantes: number, Nome: string, Senha: string) {
        let IdProfessor: number = this.autenticacaoService.getUsuario.IdUsuario;
        return this.http.post<any>(`${environment.apiUrl}/CriarSalaSimulado`, { Descricao, IdProfessor, MaxParticipantes, Nome, Senha })
            .pipe(
                map(sala => {
                    if (sala.Sucesso) {
                        return sala;
                    } else {
                        throw new Error(sala.Mensagem);
                    }
                }
                )
            )
    };

    participarSala(IdSala: number, Senha: string) {
        let IdUsuario: number = this.autenticacaoService.getUsuario.IdUsuario;
        return this.http.post<any>(`${environment.apiUrl}/ParticiparSalaSimulado`, { IdSala, IdUsuario, Senha })
            .pipe(
                map(resposta => {
                    if (resposta.Sucesso) {
                        return resposta;
                    } else {
                        throw new Error(resposta.Mensagem);
                    }
                }
                )
            )
    };

    buscarListaSalas() {
        return this.http.get<any>(`${environment.apiUrl}/BuscarSalasSimulado?idUsuario=${this.autenticacaoService.getUsuario.IdUsuario}`)
            .pipe(
                map(listaSalas => {
                    if (listaSalas.Sucesso) {
                        return listaSalas;
                    } else {
                        throw new Error(listaSalas.Mensagem);
                    }
                }
                )
            )
    };


    buscarSimuladosPorSala(IdSala: number) {
        let IdUsuario: number = this.autenticacaoService.getUsuario.IdUsuario;
        return this.http.post<any>(`${environment.apiUrl}/BuscarSimuladosPorSala`, { IdSala, IdUsuario })
            .pipe(
                map(resposta => {
                    if (resposta.Sucesso) {
                        return resposta;
                    } else {
                        throw new Error(resposta.Mensagem);
                    }
                }
                )
            )

    }

    buscarResultadosSalaSimuladoProf(IdSimulado: number) {
        let IdUsuario: number = this.autenticacaoService.getUsuario.IdUsuario;
        return this.http.post<any>(`${environment.apiUrl}/BuscarResultadosSalaSimulado`, { IdSimulado, IdUsuario })
            .pipe(
                map(resposta => {
                    if (resposta.Sucesso) {
                        return resposta;
                    } else {
                        throw new Error(resposta.Mensagem);
                    }
                }
                )
            )

    }

}
