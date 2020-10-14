import { EAssuntoSuporte } from './../../../_enuns/eassuntosuporte';
import { MetodosEnuns } from './../../../_helpers/metodos-enuns';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suporte',
  templateUrl: './suporte.component.html',
  styleUrls: ['./suporte.component.css']
})
export class SuporteComponent implements OnInit {
  formularioDeUsuario: FormGroup;
  assuntos = [];
  assunto = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private metodosEnuns: MetodosEnuns,) { }

  ngOnInit() {
    this.criarFormularioDeUsuario();
    this.assuntos = this.metodosEnuns.getValores(EAssuntoSuporte);
  }

  criarFormularioDeUsuario() {
    this.formularioDeUsuario = this.fb.group({
      assunto: ['', Validators.required],
      outroAssunto: [{ value: '', disabled: true }, Validators.required],
      descricao: ['', [Validators.required, Validators.minLength(20)]],
    });
  }


  /**
   * Método get do formulário para obter os erros
   */
  get f() { return this.formularioDeUsuario.controls; }

  getAssunto(event: any) {
    this.assunto = Number(event.target.value);
    if (this.assunto == 2) {
      this.formularioDeUsuario.get('outroAssunto').reset();
      this.formularioDeUsuario.get('outroAssunto').enable();
    }
  }

}
