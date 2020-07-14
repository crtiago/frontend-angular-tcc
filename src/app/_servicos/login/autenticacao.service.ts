import { Usuario } from './../../_modelos/usuario';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private usuarioSubject: BehaviorSubject<Usuario>;
  public usuario: Observable<Usuario>;
  
  constructor(private router: Router, private http: HttpClient) {
    this.usuarioSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuario')));
    this.usuario = this.usuarioSubject.asObservable();
  }

  public get userValue(): Usuario {
    return this.usuarioSubject.value;
  }

  login(CPF: string, Senha: string) {
    return this.http.post<any>(`https://api-tcc-sti.herokuapp.com/api/Login`, { CPF, Senha })
      .pipe(
        map(usuario => {
          // Armazena o usuário no armazenamento local para manter conectado entre as atualizações da página
          localStorage.setItem('usuario', JSON.stringify(usuario.Data));
          this.usuarioSubject.next(usuario.Data);
          return usuario.Data;
        }
        )
      )
  };


  logout() {
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null);
    this.router.navigate(['login']);
  }
}
