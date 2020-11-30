import { SimuladoService } from './../_servicos/simulados/simulado.service';
import { CadastroService } from './../_servicos/cadastro/cadastro.service';
import { DataReponse } from './../_modelos/data-response';
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class RespostaListaSimulados implements Resolve<DataReponse> {
    constructor(private simuladosService: SimuladoService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<DataReponse> {
        return this.simuladosService.buscarListaSimulados();
    }
}  