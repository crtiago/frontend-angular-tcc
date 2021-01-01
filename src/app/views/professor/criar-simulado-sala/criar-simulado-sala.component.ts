import { AutenticacaoService } from './../../../_servicos/login/autenticacao.service';
import { SimuladoService } from './../../../_servicos/simulados/simulado.service';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Validacoes } from './../../../_helpers/validacoes';
import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SalasService } from 'src/app/_servicos/salas/salas.service';

@Component({
  selector: 'app-criar-simulado-sala',
  templateUrl: './criar-simulado-sala.component.html',
  styleUrls: ['./criar-simulado-sala.component.css']
})
export class CriarSimuladoSalaComponent implements OnInit {
  carregar = false;
  formularioDeUsuario: FormGroup;

  constructor(private salasService: SalasService,private toastr: ToastrService, private fb: FormBuilder, private router: Router, private simuladoService: SimuladoService, private autenticacaoService: AutenticacaoService) { }

  ngOnInit(): void {
    this.criarFormularioDeUsuario();
  }

  criarFormularioDeUsuario() {
    this.formularioDeUsuario = this.fb.group({
      nome: ['', Validators.required],
      prazoEntrega: ['', [Validacoes.restringirData, Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
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
    let IdSala = Number(sessionStorage.getItem('idSala'));
    var QtdFormacaoEspecifica = this.formularioDeUsuario.get('quantidadeEspecifica').value;
    var QtdFormacaoGeral = this.formularioDeUsuario.get('quantidadeGeral').value;

    var ConfiguracaoEnade = { QtdFormacaoEspecifica, QtdFormacaoGeral };

    var QtdFundamentos = this.formularioDeUsuario.get('quantidadeFundamentos').value;
    var QtdMatematica = this.formularioDeUsuario.get('quantidadeMatematica').value;
    var QtdTecnologia = this.formularioDeUsuario.get('quantidadeTecnologia').value;

    var ConfiguracaoPoscomp = { QtdFundamentos, QtdMatematica, QtdTecnologia };

    var tempoMinutos = this.formularioDeUsuario.get('tempoSimulado').value * 60;

    this.simuladoService.criarSimuladoPersonalizadoProf(
      IdSala,
      ConfiguracaoEnade,
      ConfiguracaoPoscomp,
      this.formularioDeUsuario.get('prazoEntrega').value,
      new Date,
      this.formularioDeUsuario.get('descricao').value,
      this.autenticacaoService.getUsuario.IdUsuario,
      this.formularioDeUsuario.get('nome').value,
      tempoMinutos,
      this.formularioDeUsuario.get('tipoSimulado').value,
    ).pipe(first()).subscribe(
      resposta => {
        //Busca a lista de sala
        this.salasService.buscarSimuladosPorSala(IdSala).pipe(first()).subscribe(
          resposta => {
            sessionStorage.setItem('simuladosSalaProfessor', JSON.stringify(resposta.Data));
            this.carregar = false;
            this.router.navigate(['prof/listasimuladossala']);        
            this.toastr.success('Simulado criado', '', {
              timeOut: 2000,
              progressBar: true,
              progressAnimation: 'decreasing',
            });
          },
          error => {
            this.carregar = false;
            error = error.toString().replace("Error:", "");
            this.toastr.error(error, '', {
              timeOut: 2000,
              progressBar: true,
              progressAnimation: 'decreasing',
            });
          });   
          //Fim da busca a lista de sala
      },
      error => {
        this.toastr.error(error, '', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
        this.carregar = false;
      });
  }

  simuladoPadrao() {
    let IdSala = Number(sessionStorage.getItem('idSala'));
    this.simuladoService.criarSimuladoPadraoProf(
      IdSala,
      this.formularioDeUsuario.get('prazoEntrega').value,
      new Date,
      this.formularioDeUsuario.get('descricao').value,
      this.autenticacaoService.getUsuario.IdUsuario,
      this.formularioDeUsuario.get('nome').value,
      70,
      240,
      this.formularioDeUsuario.get('tipoSimulado').value,
    ).pipe(first()).subscribe(
      resposta => {
       //Busca a lista de sala
       this.salasService.buscarSimuladosPorSala(IdSala).pipe(first()).subscribe(
        resposta => {
          sessionStorage.setItem('simuladosSalaProfessor', JSON.stringify(resposta.Data));
          this.carregar = false;
          this.router.navigate(['prof/listasimuladossala']);        
          this.toastr.success('Simulado criado', '', {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'decreasing',
          });
        },
        error => {
          this.carregar = false;
          error = error.toString().replace("Error:", "");
          this.toastr.error(error, '', {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'decreasing',
          });
        });   
        //Fim da busca a lista de sala
      },
      error => {
        this.toastr.error(error, '', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
        this.carregar = false;
      });
  }
}
