import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suporte',
  templateUrl: './suporte.component.html',
  styleUrls: ['./suporte.component.css']
})
export class SuporteComponent implements OnInit {
  formularioDeUsuario: FormGroup;

  constructor( private fb: FormBuilder) { }

  ngOnInit() {
    this.criarFormularioDeUsuario();
  }

  criarFormularioDeUsuario() {
    this.formularioDeUsuario = this.fb.group({
      assunto:['', Validators.required],
      descricao:['', [Validators.required, Validators.minLength(20)]],
    });
  }


  /**
   * Método get do formulário para obter os erros
   */
  get f() { return this.formularioDeUsuario.controls; }

}
