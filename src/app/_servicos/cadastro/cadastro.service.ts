import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private http: HttpClient) { }

  cadastroAluno(CPF: string, Email: string, Instituicao: string, Nascimento: Date,
    Nome: string, Senha: string, Telefone: string, TipoUsuario: number,
    Imagem: string, Matricula: number, AnoIngresso: number) {
    return this.http.post<any>(`${environment.apiUrl}/Cadastro`, {
      CPF, Email, Instituicao, Nascimento,
      Nome, Senha, Telefone, TipoUsuario, Imagem, Matricula, AnoIngresso
    })
      .pipe(
        map(data => {
          if (data.Sucesso) {
            return data;
          } else {
            throw new Error(data.Mensagem);
          }
        }
        )
      )
  };

 cadastroProfessor(CPF: string, Email: string, Instituicao: string, Nascimento: Date,
    Nome: string, Senha: string, Telefone: string, TipoUsuario: number,
    Imagem: string, DisciplinasInteressadas: string[]) {
    return this.http.post<any>(`${environment.apiUrl}/Cadastro`, {
      CPF, Email, Instituicao, Nascimento, Nome, Senha, Telefone, TipoUsuario, Imagem, DisciplinasInteressadas
    }).pipe(map(data => {
      if (data.Sucesso) {
        return data;
      } else {
        throw new Error(data.Mensagem);
      }
    }
    ))
  };
}
