import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { SalasService } from 'src/app/_servicos/salas/salas.service';
import * as $ from "jquery";

//Varivável para habilitar e usar o jquery
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  listaSalas = [];
  listaSimulados = [];
  listaAlunos = [];
  resultadoGeralSala: any;
  salaSelecionadaBoolean: boolean = false;
  simuladoSelecionadoBoolean: boolean = false;
  idSimuladoSelecionado: number;
  salaSelecionada: any;
  simuladoSelecionado: any;
  quantidadeResposta: number = 0;
  nenhumaSala: boolean = false;
  nenhumSimulado: boolean = false;
  professor: any;
  respostaEnviadaParaSala: number = -1;
  spinnerCarregamento: boolean = false;
  simuladosCarregados: boolean = false;

  //Variaveis do gráfico de disciplina
  disciplinasInteresseProf = [];
  acertos = [];
  erros = [];
  colorAcertos = [];
  colorErros = [];

  constructor(private router: Router, private toastr: ToastrService, private route: ActivatedRoute, private salasService: SalasService) {
    this.listaSalas = this.route.snapshot.data.response.Data;
    this.professor = JSON.parse(sessionStorage.getItem('usuario'));
    if (this.listaSalas.length == 0) {
      this.nenhumaSala = true;
    } else {
      this.nenhumaSala = false;
    }
  }

  ngOnInit() { }

  buscarResultadoGeralPorSala() {
    this.spinnerCarregamento = true;
    this.salaSelecionadaBoolean = true;
    this.simuladoSelecionadoBoolean = false;
    this.listaAlunos = [];
    this.listaSimulados = [];

    this.salasService.buscarResultadoGeralPorSala(this.salaSelecionada.Id).pipe(first()).subscribe(
      resposta => {
        this.resultadoGeralSala = resposta.Data;
        this.respostaEnviadaParaSala = this.resultadoGeralSala.RespostasEnviadas;
        this.spinnerCarregamento = false;
        this.buscarListaSimulados();
      },
      error => {
        this.salaSelecionadaBoolean = false;
        this.spinnerCarregamento = false;
        error = error.toString().replace("Error:", "");
        this.toastr.error(error, '', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
      });
  }

  buscarListaSimulados() {
    this.salasService.buscarSimuladosPorSala(this.salaSelecionada.Id).pipe(first()).subscribe(
      resposta => {
        this.listaSimulados = resposta.Data;
        if (this.listaSimulados.length == 0) {
          this.nenhumSimulado = true;
        } else {
          this.simuladosCarregados = true;
          this.nenhumSimulado = false;
        }
      },
      error => {
        this.simuladosCarregados = false;
        error = error.toString().replace("Error:", "");
        this.toastr.error(error, '', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
      });
  }

  buscarDesempenhoAlunos() {
    this.simuladoSelecionadoBoolean = true;
    this.quantidadeResposta = Number(this.simuladoSelecionado.QuantidadeResposta);
    this.salasService.buscarResultadosSalaSimuladoProf(this.simuladoSelecionado.Id).pipe(first()).subscribe(
      listaAlunos => {
        this.listaAlunos = listaAlunos.Data;
        console.log(listaAlunos)
      },
      error => {
        error = error.toString().replace("Error:", "");
        this.toastr.error(error, '', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
      });
  }

  buscarResultadoSalaSimuladoAlunoEspecifico(IdAluno: number, IdSimulado: number, i: number) {
    this.salasService.buscarResultadoSalaSimuladoAlunoEspecifico(IdAluno, IdSimulado).pipe(first()).subscribe(
      resposta => {
        this.getGraficoCirculoDesempenhoGeral(resposta.Data, i);
        this.getGraficoHorizontalDesempenhoDisciplina(resposta.Data, i);
      },
      error => {
        error = error.toString().replace("Error:", "");
        this.toastr.error(error, '', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
      });
  }

  getGraficoCirculoDesempenhoGeral(resultadosGerais: any, i: number) {
    return new Chart("pie-desempenho-geral_" + i, {
      type: 'pie',
      data: {
        labels: ["Acertos", "Erros", "Não Respondidas"],
        datasets: [{
          backgroundColor: ["green", "red", "#36a2eb"],
          data: [
            resultadosGerais.ResultadoGeral.Acertos,
            resultadosGerais.ResultadoGeral.Erros,
            resultadosGerais.ResultadoGeral.NaoRespondidas,
          ]
        }]
      },
    });
  }

  getGraficoHorizontalDesempenhoDisciplina(data: any, i: number) {

    this.disciplinasInteresseProf = [];
    this.acertos = [];
    this.erros = [];
    this.colorAcertos = [];
    this.colorErros = [];

    for (let i = 0; i < data.ResultadoDisciplinas.length; i++) {
      this.getDesempenhoDisciplinaProf(data.ResultadoDisciplinas[i].DisciplinaNome, data.ResultadoDisciplinas[i].Acertos, data.ResultadoDisciplinas[i].Erros);
    }

    return new Chart("bar-chart-desempenho-disciplina_" + i, {
      type: 'horizontalBar',
      data: {
        labels: this.disciplinasInteresseProf,
        datasets: [
          {
            label: "Acertos",
            backgroundColor: this.colorAcertos,
            data: this.acertos,
          },
          {
            label: "Erros",
            backgroundColor: this.colorErros,
            data: this.erros,
          }
        ]
      },
      options: {
        legend: { display: true },
      }
    });
  }

  getDesempenhoDisciplinaProf(disciplina: string, acertos: number, erros: number) {
    this.professor.DisciplinasInteressadas.forEach(element => {
      if (element.Nome == disciplina) {
        this.disciplinasInteresseProf.push(disciplina)
        this.acertos.push(acertos);
        this.erros.push(erros);
        this.colorAcertos.push("green");
        this.colorErros.push("red");
      }
    });
  }

  gerarPdfDesempenho() {
    //this.textoBotao = "Gerando relatórios...";

    // this.carregar = true;
    const doc = new jsPDF('p', 'mm', 'a4');

    //Titulo
    doc.setFontSize(50);
    doc.setFont("Courier");
    doc.setFont("bold");
    doc.setTextColor('rgb(47,158,64)')
    var text = "Relatório de Desempenho"
    var textWidth = doc.getStringUnitWidth(text) * 50 / doc.internal.scaleFactor;
    var textOffset = (doc.internal.pageSize.width - textWidth) / 2;
    doc.text(text, textOffset, 80);

    //Tabela
    doc.setFillColor(50, 50, 50);
    doc.rect(textOffset + 10, 120, 30, 8);
    doc.rect(textOffset + 10, 128, 30, 8);
    doc.rect(textOffset + 10, 136, 30, 8);
    doc.rect(textOffset + 10, 144, 30, 8);
    doc.rect(textOffset + 10, 120, 160, 8);
    doc.rect(textOffset + 10, 128, 160, 8);
    doc.rect(textOffset + 10, 136, 160, 8);
    doc.rect(textOffset + 10, 144, 160, 8);

    //Atributos
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Professor", textOffset + 12, 125);
    doc.text("Email", textOffset + 12, 133);
    doc.text("Data de geração", textOffset + 12, 141);
    doc.text("Hora de geração", textOffset + 12, 149);

    doc.setTextColor(0, 0, 0);
    doc.text(this.professor.Nome, textOffset + 42, 125);
    doc.text(this.professor.Email, textOffset + 42, 133);
    doc.text(this.formatDate(new Date()).toString(), textOffset + 42, 141);
    doc.text(this.formatTime(new Date()).toString(), textOffset + 42, 149);
    doc.addPage();

    var y = 10;
    for (let i = 0; i < this.listaAlunos.length; i++) {
      y = y + 8;
      //Tabela
      doc.setFillColor(50, 50, 50);
      //Linha Nome
      doc.rect(textOffset + 10, y, 30, 8);
      //Linha Desempenho Geral
      doc.rect(textOffset + 10, y + 8, 160, 8);
      //Linha Acertos
      doc.rect(textOffset + 10, y + 16, 30, 8);
      //Linha Erros
      doc.rect(textOffset + 10, y + 24, 30, 8);
      //doc.rect(textOffset + 10, y + 16, 30, 8);

      //Linha Resposta Nome
      doc.rect(textOffset + 10, y, 160, 8);
      //Linha Resposta Acertos
      doc.rect(textOffset + 10, y + 16, 160, 8);
      //Linha Resposta Erros
      doc.rect(textOffset + 10, y + 24, 160, 8);



      //Atributos
      doc.setFontSize(12);
      doc.setTextColor(0,0,0);
      doc.text('Aluno', textOffset + 12, y + 6);
      doc.text('Desempenho Geral', textOffset + 75, y + 15);
      doc.setTextColor(0,240,0);
      doc.text('Acertos', textOffset + 12, y + 23);
      doc.setTextColor(240,0,0);
      doc.text('Erros', textOffset + 12, y + 31);

      doc.setTextColor(0, 0, 0);
      doc.text(this.listaAlunos[i].Nome, textOffset + 42, y + 6);
      doc.text(String(this.listaAlunos[i].ResultadoGeral.Acertos), textOffset + 42, y + 23);
      doc.text(String(this.listaAlunos[i].ResultadoGeral.Erros), textOffset + 42, y + 31);
      y = y + 30;
    }

    doc.save('relatorio.pdf')


  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [day, month, year].join('/');
  }

  formatTime(date) {
    var d = new Date(date);
    let datetext = d.toTimeString();

    datetext = datetext.split(' ')[0];
    return datetext;
  }

}
