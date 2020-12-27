import { BehaviorSubject, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EArea } from './../../../_enuns/earea';
import { EDisciplinaId } from './../../../_enuns/edisciplinasid';
import { EProva } from './../../../_enuns/eprova';

@Component({
  selector: 'app-gabarito',
  templateUrl: './gabarito.component.html',
  styleUrls: ['./gabarito.component.css']
})
export class GabaritoComponent implements OnInit {

  prova: string;
  gabarito: [];

  constructor(private sanitizer: DomSanitizer) {
    this.gabarito = JSON.parse(sessionStorage.getItem('gabarito'));
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

  getImagem(imagem: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + imagem);
  }

  getDescricaoSimulado(descricao: string, index: number) {
    this.prova = this.getProva(index);
    return this.prova.concat(descricao.toString());
  }

  //Modifica o texto para inserir as letras antes do enunciado da alternativas
  getAlternativas(letra: string, alternativa: string) {
    return letra.concat(alternativa.toString());
  }

  getAlternativaImagem(imagem: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + imagem);
  }

}
