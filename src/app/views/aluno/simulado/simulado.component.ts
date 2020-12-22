import { first } from 'rxjs/operators';
import { AutenticacaoService } from './../../../_servicos/login/autenticacao.service';
import { SimuladoService } from './../../../_servicos/simulados/simulado.service';
import { Validacoes } from './../../../_helpers/validacoes';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulado',
  templateUrl: './simulado.component.html',
  styleUrls: ['./simulado.component.css']
})
export class SimuladoComponent implements OnInit {

  carregar = false;
  formularioDeUsuario: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private simuladoService: SimuladoService, private autenticacaoService: AutenticacaoService) { }

  ngOnInit(): void {
    this.criarFormularioDeUsuario();
  }

  criarFormularioDeUsuario() {
    this.formularioDeUsuario = this.fb.group({
      nome: ['', Validators.required],
      descricao: [''],
      tipoSimulado: ['', Validators.required],
      quantidadeQuestoes: [{ value: '', disabled: true }, Validators.required],
      tempoSimulado: [{ value: '', disabled: true }, Validators.required],
    }, {
      validators:
        [Validacoes.validarQuantidadeQuestoes('quantidadeQuestoes'),
        Validacoes.validarTempoSimulado('tempoSimulado')]
    }
    );
  };

  get f() { return this.formularioDeUsuario.controls; }

  getTipo(e) {
    if (this.formularioDeUsuario.get('tipoSimulado').value == 0) {

      this.formularioDeUsuario.get('quantidadeQuestoes').enable();
      this.formularioDeUsuario.get('tempoSimulado').enable();

    } else {
      this.formularioDeUsuario.get('quantidadeQuestoes').disable();
      this.formularioDeUsuario.get('tempoSimulado').disable();
      this.formularioDeUsuario.get('quantidadeQuestoes').reset();
      this.formularioDeUsuario.get('tempoSimulado').reset();
    }
  }
 
  criarSimulado() {
    this.carregar = true;

    this.simuladoService.criarSimuladoPadrao(
      2005,
      new Date,
      new Date,
      this.formularioDeUsuario.get('descricao').value,
      this.autenticacaoService.getUsuario.IdUsuario,
      this.formularioDeUsuario.get('nome').value,
      70,
      240,
      this.formularioDeUsuario.get('tipoSimulado').value,
    ).pipe(first()).subscribe(
      resposta => {
        this.router.navigateByUrl('/aluno/listasimulados');
      },
      error => {
        console.log(error);
        this.carregar = false;
      });

  }

}
