import { Usuario } from './../../_modelos/usuario';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoServiceService {
  private usuarioAtualSubject: BehaviorSubject<Usuario>;
  public usuarioAtual: Observable<Usuario>;

  constructor(private http: HttpClient) {
    this.usuarioAtualSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuarioAtual')));
    this.usuarioAtual = this.usuarioAtualSubject.asObservable();
  }

  login(CPF: string, Senha: string) {
    return this.http.post<any>(`https://api-tcc-sti.herokuapp.com/api/Login`, { CPF, Senha })
      .pipe(
        map(usuario => {
          //Se o retorno for True ele salva o usuario no LocalStorage
          if (usuario.Sucesso) {
            // Armazena o usuário no armazenamento local para manter conectado entre as atualizações da página
            localStorage.setItem('usuarioAtual', JSON.stringify(usuario.Data));
            this.usuarioAtualSubject.next(usuario.Data);
            return usuario.Data;
          };
        }
        )
      )
  };


  logout() {
    // Remove o usuário do armazenamento local quando o mesmo faz logout
    localStorage.removeItem('usuarioAtual');
    this.usuarioAtualSubject.next(null);
  }
}
