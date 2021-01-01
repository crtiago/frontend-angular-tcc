import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { EArea } from './../../../_enuns/earea';
import { EProva } from './../../../_enuns/eprova';
import { EDisciplinaId } from './../../../_enuns/edisciplinasid';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-alunos-sala',
  templateUrl: './lista-alunos-sala.component.html',
  styleUrls: ['./lista-alunos-sala.component.css']
})
export class ListaAlunosSalaComponent implements OnInit {

  prova: string;
  listaAlunos: [];

  constructor(private sanitizer: DomSanitizer, private router: Router,) {
    this.listaAlunos = JSON.parse(sessionStorage.getItem('listaAlunos'));
    //Caso o listaAlunos esteja null ele retorna para a lista de simulados
    if (this.listaAlunos == null || this.listaAlunos == [""]) {
      this.router.navigate(['prof/listasimuladossala']);
    }
  }
  
  ngOnDestroy(): void {
    sessionStorage.setItem('listaAlunos', null);
  }

  ngOnInit() {

  }

  getArea(index: number) {
    return EArea[index];
  }

  getDisciplina(index: number) {
    return EDisciplinaId[index];
  }

  getProva(index: number) {
    return EProva[index];
  }

}
