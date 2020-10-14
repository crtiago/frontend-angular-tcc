import { AutenticacaoService } from './../_servicos/login/autenticacao.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


/**
 * Classe responsável por tratar os erros que vem do backend 
 */
@Injectable()
export class InterceptadorErros implements HttpInterceptor {
    constructor(private autenticacaoService: AutenticacaoService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([404].indexOf(err.status) !== -1) {
                const error = 'Falha de comunicação com o servidor, tente novamente mais tarde!';
                return throwError(error);
            }
            if ([405].indexOf(err.status) !== -1) {
                const error = 'Erro ao atualizar as informações do usuário, tente novamente mais tarde';
                return throwError(error);
            }
        }))
    }
}