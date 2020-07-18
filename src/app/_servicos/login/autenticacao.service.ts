import { environment } from './../../../environments/environment';
import { Usuario } from './../../_modelos/usuario';
import { Router } from '@angular/router';
import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Classe responsável pela autenticação e comunicação com o backend
 */
export class AutenticacaoService {
  private usuarioSubject: BehaviorSubject<Usuario>;
  public usuario: Observable<Usuario>;

  constructor(private router: Router, private http: HttpClient) {
    this.usuarioSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuario')));
    this.usuario = this.usuarioSubject.asObservable();
  }

  /**
   * Método que retorna o usuário e suas informações
   */
  public get getUsuario(): Usuario {
    return this.usuarioSubject.value;
  }

  /**
   * Método de login que faz a conexão com a API, enviando o CPF e a senha, e retornando 
   * o usuário se os dados estiverem corretos caso contrário retorna Erro 404
   * @param CPF 
   * @param Senha 
   */
  login(CPF: string, Senha: string) {
    return this.http.post<any>(`${environment.apiUrl}/Login`, { CPF, Senha })
      .pipe(
        map(usuario => {
          //Se o Sucesso for false, ele retorna o Erro com a mensagem que vem do back
          if (!usuario.Sucesso) {
            throw new Error(usuario.Mensagem);
          } else {
            // Armazena o usuário no armazenamento local para manter conectado entre as atualizações da página
            localStorage.setItem('usuario', JSON.stringify(usuario.Data));
            this.usuarioSubject.next(usuario.Data);
            return usuario.Data;
          }
        }
        )
      )
  };

  /**
   * Método que retorna ao home do tipo do usuário logado
   */
  logado() {
    if (this.getUsuario) {
      if (this.getUsuario.TipoUsuario == 1) {
        this.router.navigate(['aluno']);
      } else {
        this.router.navigate(['prof']);
      }
    }
  }

  /**
   * Método que realiza o lougout do usuário do sistema:
   * - Remove do localStorage
   * - Define o usuarioSubject como null
   * - E navega para a tela de Login
   */
  logout() {
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null);
    this.router.navigate(['login']);
  }
}
