import { DataReponse } from './../../_modelos/data-response';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private http: HttpClient) { }

  cadastroAluno(CPF: string, Email: string, Instituicao: number, Nascimento: Date,
    Nome: string, Senha: string, Telefone: string, TipoUsuario: number,
    ImagemUsuario: string, Matricula: number, AnoIngresso: number) {
    return this.http.post<any>(`${environment.apiUrl}/Cadastro`, {
      CPF, Email, Instituicao, Nascimento,
      Nome, Senha, Telefone, TipoUsuario, ImagemUsuario, Matricula, AnoIngresso
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

  alterarAluno(IdUsuario: number, CPF: string, Email: string, Instituicao: number, Nascimento: Date,
    Nome: string, Telefone: string, TipoUsuario: number,
    ImagemUsuario: string, Matricula: number, AnoIngresso: number) {
    return this.http.put<any>(`${environment.apiUrl}/Alterar`, {
      IdUsuario, CPF, Email, Instituicao, Nascimento,
      Nome, Telefone, TipoUsuario, ImagemUsuario, Matricula, AnoIngresso
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

  cadastroProfessor(CPF: string, Email: string, Instituicao: number, Nascimento: Date,
    Nome: string, Senha: string, Telefone: string, TipoUsuario: number,
    ImagemUsuario: string, DisciplinasInteressadas: string[]) {
    return this.http.post<any>(`${environment.apiUrl}/Cadastro`, {
      CPF, Email, Instituicao, Nascimento, Nome, Senha, Telefone, TipoUsuario, ImagemUsuario, DisciplinasInteressadas
    }).pipe(map(data => {
      if (data.Sucesso) {
        return data;
      } else {
        throw new Error(data.Mensagem);
      }
    }
    ))
  };

  alterarProfessor(IdUsuario: number, CPF: string, Email: string, Instituicao: number, Nascimento: Date,
    Nome: string, Telefone: string, TipoUsuario: number,
    ImagemUsuario: string, DisciplinasInteressadas: string[]) {
    return this.http.put<any>(`${environment.apiUrl}/Alterar`, {
      IdUsuario, CPF, Email, Instituicao, Nascimento, Nome, Telefone, TipoUsuario, ImagemUsuario, DisciplinasInteressadas
    }).pipe(map(data => {
      if (data.Sucesso) {
        return data;
      } else {
        throw new Error(data.Mensagem);
      }
    }
    ))
  };

  enviarEmail(Assunto: string, Mensagem: string) {
    return this.http.post<any>(`${environment.apiUrl}/EnviarEmail`, {Assunto, Mensagem}).pipe(map(data => {
      if (data.Sucesso) {
        return data;
      } else {
        throw new Error(data.Mensagem);
      }
    }
    ))
  };

  getInstituicoes() {
    return this.http.get<DataReponse>(`${environment.apiUrl}/BuscarTodasInstituicao`).pipe(delay(500));
  }
}
