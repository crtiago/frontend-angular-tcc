import { CanComponentDeactivate } from './../../../_servicos/rota/deactivate-guard.service';
import { ConfirmacaoDialogoService } from './../../utils/caixa-dialogo/confirmacao-dialogo.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, HostListener, Input } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { CountdownComponent } from 'ngx-countdown';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-simulado-gerado',
  templateUrl: './simulado-gerado.component.html',
  styleUrls: ['./simulado-gerado.component.css']
})
export class SimuladoGeradoComponent implements OnInit, CanComponentDeactivate {

  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  value = 0;
  tempo;
  tempoAtual: number;
  imagem = "../../../../assets/img/exame.svg";

  paragraph: string = `
  Acerca da posição relativa $\\left ( y_{n} \\right ) = \\frac{1}{n}$ então $\\lim_{n \\rightarrow \\infty} y_{n} = 1$ 4 Textos grandes, 
  inspiradores e com lindas lições de vida! É cada um mais lindo que o outro, confira: 1. 
  A flor da honestidade Conta-se que por volta do ano 250 A.C, na China antiga, um príncipe 4
  da região norte do país, estava às vésperas de ser coroado imperador, mas, de acordo com a lei, 
  ele deveria se casar. Sabendo disso, ele resolveu fazer uma “disputa” entre as moças da corte ou 
  quem quer que se achasse digna de sua proposta No dia seguinte, o príncipe anunciou que receberia, 
  numa celebração especiale. Tire esta ideia insensata da cabeça; eu sei que você deve estar sofrendo, 
  mas não torne o sofrimento uma loucura. Textos grandes, inspiradores e com lindas lições de vida! 
  É cada um mais lindo que o outro, confira: 1. A flor da honestidade Conta-se que por volta do ano 
  250 A.C, na China antiga, um príncipe da região norte do país, estava às vésperas de ser coroado 
  imperador, mas, de acordo com a lei, ele deveria se casar. Sabendo disso, ele resolveu fazer uma 
  “disputa” entre as moças da corte ou quem quer que se achasse digna de sua proposta No dia seguinte, 
  o príncipe anunciou que receberia, numa celebração especial, todas as pretendentes e lançaria um desafio. 
  Uma velha senhora, serva do palácio há muitos anos, ouvindo os comentários sobre os preparativos, 
  sentiu uma leve tristeza, pois sabia que sua jovem filha nutria um sentimento de profundo amor pelo 
  príncipe Ao chegar em casa e relatar o fato a jovem, espantou-se ao saber que ela pretendia ir à 
  celebração, e indagou incrédulainha filha, o que você fará lá? Estarão presentes todas as mais belas 
  e ricas moças da corte. Tire esta ideia insensata da cabeça; eu sei que você deve estar sofrendo, 
  mas não torne o sofrimento uma loucura
  `;

  constructor(private router: Router, private confirmacaoDialogoService: ConfirmacaoDialogoService) {
    this.tempoAtual = JSON.parse(localStorage.getItem('tempo'));
    this.tempo = { leftTime: this.tempoAtual };

    this.getSimuladoSelecionado();
  }

  ngOnInit(): void {

  }

  getSimuladoSelecionado() {
    if (localStorage.getItem('tipoSimulado') == '0') {
      console.log('Chama método getSimuladoPersonalizado');
    } else if (localStorage.getItem('tipoSimulado') == '1') {
      console.log('Chama método getSimuladoEnade');
    } else if (localStorage.getItem('tipoSimulado') == '2') {
      console.log('Chama método getSimuladoPoscomp');
    }
  }

  canDeactivate() {
    if (this.value < 100) {
      let result: Promise<boolean> = this.confirmacaoDialogoService.confirm('../../../../assets/img/question.svg', 'Seu progresso será perdido! Tem certeza que deseja sair?')
        .then((confirmed) => confirmed).catch(function () {
          return false;
        });
      return result;
    }
    return true;
  }

  @HostListener('window:beforeunload') salvarDadosAntesDeAtualizar() {
    this.countdown.pause();
  }

  getTempoAtual($event) {
    this.tempoAtual = $event.left;
    //Removendo os 0's a direita que o countdown adiciona 
    let tempoAtualString = this.tempoAtual.toString().slice(0, -3);
    localStorage.setItem("tempo", tempoAtualString);
  }

  proximaQuestao() {
    this.value = this.value + 5;
  }

  finalizarSimulado() {
    this.router.navigateByUrl("aluno/dashboard");
  }

  converterMinutosEmSegundos(minutos: number) {
    return minutos * 60;
  }
}
