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


export class SimuladoService {

    private simuladoSubject: BehaviorSubject<Simulado>;
    public simulado: Observable<Simulado>;

    constructor(private router: Router, private http: HttpClient) {
        this.simuladoSubject = new BehaviorSubject<Simulado>(JSON.parse(sessionStorage.getItem('simulado')));
        this.simulado = this.simuladoSubject.asObservable();
    }

    public get getSimuladoValor(): Simulado {
        return this.simuladoSubject.value;
    }

    criarSimulado(DataFimSimulado: Date, DataInicio: Date, Descricao: string, IdUsuario: number, Nome: string, QuantidadeQuestoes: number, TempoMaximo: number, TipoSimulado: number) {
        return this.http.post<any>(`${environment.apiUrl}/GerarSimulado`, { DataFimSimulado, DataInicio, Descricao, IdUsuario, Nome, QuantidadeQuestoes, TempoMaximo, TipoSimulado })
            .pipe(
                map(simulado => {
                    if (simulado.Sucesso) {
                        sessionStorage.setItem('simulado', JSON.stringify(simulado.Data));
                        this.simuladoSubject.next(simulado.Data);
                        return simulado;
                    } else {
                        throw new Error(simulado.Mensagem);
                    }
                }
                )
            )
    };


}
