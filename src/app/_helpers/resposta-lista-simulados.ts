import { SimuladoService } from './../_servicos/simulados/simulado.service';
import { DataReponse } from './../_modelos/data-response';
import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class RespostaListaSimulados implements Resolve<DataReponse> {
    constructor(private simuladosService: SimuladoService) { }

    resolve(): Observable<DataReponse> {
        return this.simuladosService.buscarListaSimulados();
    }
}  