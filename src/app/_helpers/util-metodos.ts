import { CadastroService } from './../_servicos/cadastro/cadastro.service';
import { DataReponse } from './../_modelos/data-response';
import { Injectable } from "@angular/core";  
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";  
import { Observable } from "rxjs";  
  
@Injectable()  
export class UtilMetodos implements Resolve<DataReponse> {  
  constructor(private cadastroService: CadastroService) {}  
  
  resolve(route: ActivatedRouteSnapshot): Observable<DataReponse> {  
    return this.cadastroService.getInstituicoes();
  }  
}  