import { EProva } from './../../../_enuns/eprova';
import { EDisciplinaId } from './../../../_enuns/edisciplinasid';
import { EArea } from './../../../_enuns/earea';
import { EDisciplina } from './../../../_enuns/edisciplinas';
import { MetodosEnuns } from './../../../_helpers/metodos-enuns';
import { AutenticacaoService } from './../../../_servicos/login/autenticacao.service';
import { first } from 'rxjs/operators';
import { Resposta } from './../../../_modelos/resposta';
import { DomSanitizer } from '@angular/platform-browser';
import { SimuladoService } from './../../../_servicos/simulados/simulado.service';
import { Simulado } from './../../../_modelos/simulado';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CanComponentDeactivate } from './../../../_servicos/rota/deactivate-guard.service';
import { ConfirmacaoDialogoService } from './../../utils/caixa-dialogo/confirmacao-dialogo.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';

@Component({
  selector: 'app-simulado-gerado',
  templateUrl: './simulado-gerado.component.html',
  styleUrls: ['./simulado-gerado.component.css']
})
export class SimuladoGeradoComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  @ViewChild('cd', { static: false }) private cronometro: CountdownComponent;
  progresso: number;
  tempo: any;
  tempoAtual: number;
  habilitarBotao: boolean = true;
  imagem: string;
  textoBotao: string = "Próxima Questão"
  formulario: FormGroup;
  simulado: any;
  index: number;
  quantidadeQuestoes: number;
  listaRespostas = [];
  aluno: any;
  area: string;
  disciplina: string;
  prova: string;
  carregar = false;

  constructor(private router: Router, private sanitizer: DomSanitizer,
    private confirmacaoDialogoService: ConfirmacaoDialogoService, private fb: FormBuilder,
    private simuladoService: SimuladoService, private autenticacaoService: AutenticacaoService, private metodosDisciplinas: MetodosEnuns) {

    this.aluno = autenticacaoService.getUsuario;

    this.verificarSimulado();
    this.formulario = fb.group({
      alternativas: ['', Validators.required]
    });
    this.simulado = this.simuladoService.getSimuladoValor;
    this.index = Number(sessionStorage.getItem('index'));
    this.quantidadeQuestoes = Object.keys(this.simulado).length;
  }

  ngOnInit(): void {


    if (!(sessionStorage.getItem('respostas') == '[]')) {
      this.listaRespostas = JSON.parse(sessionStorage.getItem('respostas'));
    }
    this.imagem = this.simulado[this.index].ImagemQuestao;
    this.getDisciplinaEArea();
  }

  tempoAcabou(e:Event){
    if (e["action"] == "done"){
      console.log('Tempo acabou')
     }
   }

  ngOnDestroy(): void {
    sessionStorage.setItem("tempo", '');
    sessionStorage.setItem("tipoSimulado", '');
    sessionStorage.setItem("progresso", '');
    sessionStorage.setItem("index", '0');
    sessionStorage.setItem("idSimulado", '');
    sessionStorage.setItem("respostas", '[]');
    sessionStorage.setItem("simulado", '');
  }

  getDisciplinaEArea() {
    this.area = EArea[this.simulado[this.index].Area];
    this.disciplina = EDisciplinaId[this.simulado[this.index].Disciplina];
    this.prova = EProva[this.simulado[this.index].Prova];
  }

  canDeactivate() {
    if ((this.index + 1) < this.quantidadeQuestoes) {
      let result: Promise<boolean> = this.confirmacaoDialogoService.confirm('Seu progresso será perdido! Tem certeza que deseja sair?')
        .then((confirmed) => confirmed).catch(function () {
          return false;
        });
      return result;
    }
    return true;
  }

  getImagem() {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + this.imagem);
  }

  verificarSimulado() {
    if (sessionStorage.getItem('tipoSimulado') == '' || sessionStorage.getItem('tipoSimulado') == null) {
      this.router.navigateByUrl("aluno/simulado");
    } else {
      this.tempoAtual = Number(sessionStorage.getItem('tempo'));
      this.tempo = { leftTime: this.tempoAtual };
      this.progresso = Number(sessionStorage.getItem('progresso'));
    }
  }

  /*Salvando as informações caso o usuário atualize a página*/
  @HostListener('window:beforeunload') salvarDadosAntesDeAtualizar() {
    this.cronometro.pause();
    sessionStorage.setItem('progresso', JSON.stringify(this.progresso));
    sessionStorage.setItem('index', this.index.toString());
    sessionStorage.setItem('respostas', JSON.stringify(this.listaRespostas));
  }

  getTempoAtual($event) {
    this.tempoAtual = $event.left;
    //Removendo os 0's a direita que o countdown adiciona 
    let tempoAtualString = this.tempoAtual.toString().slice(0, -3);
    sessionStorage.setItem("tempo", tempoAtualString);
  }

  proximaQuestao() {

    this.listaRespostas.push(new Resposta(this.simulado[this.index].Id, true, this.formulario.get('alternativas').value, this.simulado[this.index].TipoQuestao));

    sessionStorage.setItem('respostas', JSON.stringify(this.listaRespostas));

    if (this.index == (this.quantidadeQuestoes - 2)) {
      this.textoBotao = "Finalizar Simulado"
    }

    if (this.index > (this.quantidadeQuestoes - 2)) {
      this.carregar = true;
      let idSimulado = Number(sessionStorage.getItem('idSimulado'));

      this.simuladoService.finalizarSimulado(idSimulado, this.aluno.IdUsuario, this.listaRespostas).pipe(first()).subscribe(
        simulado => {

          this.router.navigateByUrl("aluno/dashboard");
          sessionStorage.setItem("tempo", '');
          sessionStorage.setItem("tipoSimulado", '');
          sessionStorage.setItem("progresso", '');
          sessionStorage.setItem("index", '');
          sessionStorage.setItem("idSimulado", '');
          sessionStorage.setItem("respostas", '');
          sessionStorage.setItem("simulado", '');
        },
        error => {
          this.carregar = false;
          console.log(error);
        });
    } else {
      this.imagem = "";
      this.index++;
      this.progresso = this.progresso + (100 / this.quantidadeQuestoes);
      this.formulario.get('alternativas').reset();
      this.ngOnInit();
    }
  }

  converterMinutosEmSegundos(minutos: number) {
    return minutos * 60;
  }

  getDescricaoSimulado(descricao: string){
    return this.prova.concat(descricao.toString());
  }

  //Modifica o texto para inserir as letras antes do enunciado da alternativas
  getAlternativas(letra:string, alternativa:string){
    return letra.concat(alternativa.toString());
  }
}
