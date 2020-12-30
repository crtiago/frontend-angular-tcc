import { SalasService } from './../_servicos/salas/salas.service';
import { DataReponse } from './../_modelos/data-response';
import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class RespostaListaSalas implements Resolve<DataReponse> {
    constructor(private salasService: SalasService) { }

    resolve(): Observable<DataReponse> {
        return this.salasService.buscarListaSalas();
    }
}  