import { first } from 'rxjs/operators';
import { AutenticacaoService } from '../../../_servicos/login/autenticacao.service';
import { SimuladoService } from '../../../_servicos/simulados/simulado.service';
import { Validacoes } from '../../../_helpers/validacoes';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulado',
  templateUrl: './simulado-criar.component.html',
  styleUrls: ['./simulado-criar.component.css']
})
export class SimuladoCriarComponent implements OnInit {

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
      quantidadeFundamentos: [{ value: '', disabled: true }, Validators.required],
      quantidadeMatematica: [{ value: '', disabled: true }, Validators.required],
      quantidadeTecnologia: [{ value: '', disabled: true }, Validators.required],
      quantidadeEspecifica: [{ value: '', disabled: true }, Validators.required],
      quantidadeGeral: [{ value: '', disabled: true }, Validators.required],
      tempoSimulado: [{ value: '', disabled: true }, Validators.required],
    }, {
      validators:
        [Validacoes.validarQuantidadeQuestoes('quantidadeFundamentos'),
        Validacoes.validarQuantidadeQuestoes('quantidadeMatematica'),
        Validacoes.validarQuantidadeQuestoes('quantidadeTecnologia'),
        Validacoes.validarQuantidadeQuestoes('quantidadeEspecifica'),
        Validacoes.validarQuantidadeQuestoes('quantidadeGeral'),
        Validacoes.validarTempoSimulado('tempoSimulado')]
    }
    );
  };

  get f() { return this.formularioDeUsuario.controls; }

  getTipo(e) {
    if (this.formularioDeUsuario.get('tipoSimulado').value == 0) {

      this.formularioDeUsuario.get('quantidadeFundamentos').enable();
      this.formularioDeUsuario.get('quantidadeMatematica').enable();
      this.formularioDeUsuario.get('quantidadeTecnologia').enable();
      this.formularioDeUsuario.get('quantidadeEspecifica').enable();
      this.formularioDeUsuario.get('quantidadeGeral').enable();
      this.formularioDeUsuario.get('tempoSimulado').enable();

    } else {
      this.formularioDeUsuario.get('quantidadeFundamentos').disable();
      this.formularioDeUsuario.get('quantidadeMatematica').disable();
      this.formularioDeUsuario.get('quantidadeTecnologia').disable();
      this.formularioDeUsuario.get('quantidadeEspecifica').disable();
      this.formularioDeUsuario.get('quantidadeGeral').disable();
      this.formularioDeUsuario.get('tempoSimulado').disable();
      this.formularioDeUsuario.get('quantidadeFundamentos').reset();
      this.formularioDeUsuario.get('quantidadeMatematica').reset();
      this.formularioDeUsuario.get('quantidadeTecnologia').reset();
      this.formularioDeUsuario.get('quantidadeEspecifica').reset();
      this.formularioDeUsuario.get('quantidadeGeral').disable();
      this.formularioDeUsuario.get('tempoSimulado').reset();
    }
  }

  criarSimulado() {
    this.carregar = true;
    if (this.formularioDeUsuario.get('tipoSimulado').value == '0') {
      this.simuladoPersonalizado();
    } else {
      this.simuladoPadrao();
    }

  }
  simuladoPersonalizado() {

    var QtdFormacaoEspecifica = this.formularioDeUsuario.get('quantidadeEspecifica').value;
    var QtdFormacaoGeral = this.formularioDeUsuario.get('quantidadeGeral').value;

    var ConfiguracaoEnade = { QtdFormacaoEspecifica, QtdFormacaoGeral };

    var QtdFundamentos = this.formularioDeUsuario.get('quantidadeFundamentos').value;
    var QtdMatematica = this.formularioDeUsuario.get('quantidadeMatematica').value;
    var QtdTecnologia = this.formularioDeUsuario.get('quantidadeTecnologia').value;

    var ConfiguracaoPoscomp = { QtdFundamentos, QtdMatematica, QtdTecnologia };

    var tempoMinutos = this.formularioDeUsuario.get('tempoSimulado').value * 60;

    this.simuladoService.criarSimuladoPersonalizado(
      ConfiguracaoEnade,
      ConfiguracaoPoscomp,
      new Date,
      new Date,
      this.formularioDeUsuario.get('descricao').value,
      this.autenticacaoService.getUsuario.IdUsuario,
      this.formularioDeUsuario.get('nome').value,
      tempoMinutos,
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

  simuladoPadrao() {
    this.simuladoService.criarSimuladoPadrao(
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
