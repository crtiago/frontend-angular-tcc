import { Usuario } from './../../_modelos/usuario';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
    private usuarioAtualSubject: BehaviorSubject<Usuario>;
    public usuarioAtual: Observable<Usuario>;


  constructor(private http: HttpClient) {
    this.usuarioAtualSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuarioAtual')));
    this.usuarioAtual = this.usuarioAtualSubject.asObservable();
   }


   public get valorUsuarioAtual(): Usuario{
     return this.usuarioAtualSubject.value;
   }

   login(CPF: string, Senha: string){
     return this.http.post<any>(`https://api-tcc-sti.herokuapp.com/api/Login`, {CPF, Senha})
     .pipe(map(usuario => {

      if(usuario){
        console.log(usuario)
        localStorage.setItem('usuarioAtual', JSON.stringify(usuario));
        this.usuarioAtualSubject.next(usuario);
      }

      return usuario;

     }));
   }

   logout(){
     localStorage.removeItem('usuarioAtual');
     this.usuarioAtualSubject.next(null);
   }
}
