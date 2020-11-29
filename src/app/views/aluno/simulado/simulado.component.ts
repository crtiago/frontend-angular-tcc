import { Simulado } from './../../../_modelos/simulado';
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

  gerarSimulado() {
    if (this.formularioDeUsuario.get('tipoSimulado').value == '0') {
      this.criarSimuladoPersonalizado();
    } else if (this.formularioDeUsuario.get('tipoSimulado').value == '1') {
      this.criarSimuladoEnade();
    } else {
      this.criarSimuladoPoscomp();
    }

  }

  criarSimuladoPersonalizado() {
    sessionStorage.setItem('tipoSimulado', '0')
    //Salvando o tempo digitado
    let tempo = this.converterMinutosEmSegundos(this.formularioDeUsuario.get('tempoSimulado').value);
    sessionStorage.setItem('tempo', JSON.stringify(tempo));

    //Setando o progresso do usuário para 0, pois ele está iniciando
    sessionStorage.setItem('progresso', '0');

    this.router.navigateByUrl('/aluno/simuladogerado');
  }

  criarSimuladoEnade() {
    //Tempo Padrão - 4 horas
    sessionStorage.setItem('tempo', '14400')
    sessionStorage.setItem('tipoSimulado', '1')
    //Setando o progresso do usuário para 0, pois ele está iniciando
    sessionStorage.setItem('progresso', '0');
    this.router.navigateByUrl('/aluno/simuladogerado');
  }

  criarSimuladoPoscomp() {
    this.carregar = true;
    //Tempo Padrão - 4 horas
    sessionStorage.setItem('tempo', '14400')
    sessionStorage.setItem('tipoSimulado', '2')
    //Setando o progresso do usuário para 0, pois ele está iniciando
    sessionStorage.setItem('progresso', '0');

    this.simuladoService.criarSimulado(
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
        sessionStorage.setItem('index','0');
        this.router.navigateByUrl('/aluno/simuladogerado');
      },
      error => {
        console.log(error);
        this.carregar = false;
      });

  }

  converterMinutosEmSegundos(minutos: number) {
    return minutos * 60;
  }

}
