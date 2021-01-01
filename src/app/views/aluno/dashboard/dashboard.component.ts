import { AutenticacaoService } from './../../../_servicos/login/autenticacao.service';
import { EProvaResultado } from './../../../_enuns/eprovaresultado';
import { EProva } from './../../../_enuns/eprova';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from './../../../_servicos/resultados/dashboard.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import * as $ from "jquery";

//Varivável para habilitar e usar o jquery
declare var $: any;

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  resultadosGerais: any;
  ultimosResultados: any[];
  desempenhoDisciplinas: any;
  imagem: any;
  nenhumResultado: boolean = true;
  carregar: boolean = false;
  usuario: any;
  textoBotao = "Gerar relatórios";

  constructor(private route: ActivatedRoute, private dashboardService: DashboardService, private autenticacaoService: AutenticacaoService) {
    console.log(this.route.snapshot.data['respostaResultados'][0])
    console.log(this.route.snapshot.data['respostaResultados'][1])
    console.log(this.route.snapshot.data['respostaResultados'][2])
   
    if (this.route.snapshot.data['respostaResultados'][0].Sucesso &&
      this.route.snapshot.data['respostaResultados'][1].Sucesso &&
      this.route.snapshot.data['respostaResultados'][2].Sucesso) {

      this.ultimosResultados = this.route.snapshot.data['respostaResultados'][0].Data;
      this.resultadosGerais = this.route.snapshot.data['respostaResultados'][1].Data;
      this.desempenhoDisciplinas = this.route.snapshot.data['respostaResultados'][2].Data;
      this.usuario = this.autenticacaoService.getUsuario;
      this.nenhumResultado = false;
    } else {
      this.nenhumResultado = true;
    }

  }

  ngOnInit() {
    if (this.route.snapshot.data['respostaResultados'][0].Sucesso && this.route.snapshot.data['respostaResultados'][1].Sucesso) {
      this.getGraficoBarraDesempenhoUltimos();
      this.getGraficoLinha();
      this.getGraficoCirculoDesempenhoGeral();
      this.getGraficoBarraHorizontalDesempenhoArea();
      this.getGraficoAcertosArea();
      this.getGraficoErrosArea();
      this.getGraficoHorizontalDesempenhoDisciplinaAreaFundamentos();
      this.getGraficoHorizontalDesempenhoDisciplinaAreaMatematica();
      this.getGraficoHorizontalDesempenhoDisciplinaAreaTecnologia();
    }
  }

  getGraficoLinha() {
    let datasEnvio = [];
    let acertos = [];
    let erros = [];

    for (let i = 0; i < this.ultimosResultados.length; i++) {
      datasEnvio.push(this.formatDate(this.ultimosResultados[i].DataEnvio));
      acertos.push(this.ultimosResultados[i].ResultadoGeral.Acertos);
      erros.push(this.ultimosResultados[i].ResultadoGeral.Erros);
    }

    let errosReverso = erros.reverse();
    let acertosReverso = acertos.reverse();

    return new Chart(document.getElementById("mixed-chart"), {
      type: 'bar',
      data: {
        labels: datasEnvio.reverse(),
        datasets: [{
          label: "Acertos",
          type: "line",
          borderColor: "green",
          data: acertosReverso,
          fill: false
        }, {
          label: "Erros",
          type: "line",
          borderColor: "red",
          data: errosReverso,
          fill: false
        }, {
          label: "Acertos",
          type: "bar",
          backgroundColor: "rgba(0,0,0,0.2)",
          data: acertosReverso,
        }, {
          label: "Erros",
          type: "bar",
          backgroundColor: "rgba(0,0,0,0.2)",
          data: errosReverso
        }
        ]
      },
      options: {
        legend: { display: false }
      }
    });
  }

  getGraficoBarraDesempenhoUltimos() {
    let datasEnvio = [];
    let acertos = [];
    let erros = [];

    for (let i = 0; i < this.ultimosResultados.length; i++) {
      datasEnvio.push(this.formatDate(this.ultimosResultados[i].DataEnvio));
      acertos.push(this.ultimosResultados[i].ResultadoGeral.Acertos);
      erros.push(this.ultimosResultados[i].ResultadoGeral.Erros);
    }

    return new Chart('chart-bar', {
      type: 'bar',
      data: {
        labels: datasEnvio.reverse(),
        datasets: [{
          label: 'Acertos',
          data: acertos.reverse(),
          backgroundColor: 'green',
          borderColor: 'green',
          borderWidth: 2
        },
        {
          label: 'Erros',
          data: erros.reverse(),
          backgroundColor: 'red',
          borderColor: 'red',
          borderWidth: 2
        }
        ]
      },
      options: {
        barValueSpacing: 1,
        scales: {
          yAxes: [{
            ticks: {
              fontColor: 'rgba(0,0,0,.6)',
              fontStyle: 'bold',
              beginAtZero: true,
              maxTicksLimit: 8,
              padding: 10
            }
          }],
          dataset: [{
            barPercentage: 0.4
          }]
        },
        responsive: true,
        legend: {
          position: 'top',
          display: true
        },
      }
    });
  }

  getGraficoCirculoDesempenhoGeral() {
    return new Chart("pie-desempenho-geral", {
      type: 'pie',
      data: {
        labels: ["Acertos", "Erros", "Não Respondidas"],
        datasets: [{
          backgroundColor: ["green", "red", "#36a2eb"],
          data: [
            this.resultadosGerais.ResultadoGeral.Acertos,
            this.resultadosGerais.ResultadoGeral.Erros,
            this.resultadosGerais.ResultadoGeral.NaoRespondidas,
          ]
        }]
      },
    });
  }

  getGraficoBarraHorizontalDesempenhoArea() {
    return new Chart("bar-chart-desempenho-area", {
      type: 'horizontalBar',
      data: {
        labels: ["Fundamentos", "Matemática", "Tecnologia"],
        datasets: [
          {
            label: "Acertos",
            backgroundColor: ["green", "green", "green"],
            data: [
              this.resultadosGerais.ResultadoFundamentos.Acertos,
              this.resultadosGerais.ResultadoMatematica.Acertos,
              this.resultadosGerais.ResultadoTecnologia.Acertos,
            ]
          },
          {
            label: "Erros",
            backgroundColor: ["red", "red", "red"],
            data: [
              this.resultadosGerais.ResultadoFundamentos.Erros,
              this.resultadosGerais.ResultadoMatematica.Erros,
              this.resultadosGerais.ResultadoTecnologia.Erros,
            ]
          }
        ]
      },
      options: {
        legend: { display: true },
      }
    });
  }

  getGraficoAcertosArea() {
    return new Chart("pie-area-acertos", {
      type: 'pie',
      data: {
        labels: ["Fundamentos", "Matemática", "Tecnologia"],
        datasets: [{
          backgroundColor: ["#ff953e", "#cbe034", "#00d3b4"],
          data: [
            this.resultadosGerais.ResultadoFundamentos.Acertos,
            this.resultadosGerais.ResultadoMatematica.Acertos,
            this.resultadosGerais.ResultadoTecnologia.Acertos,
          ]
        }]
      },
    });
  }

  getGraficoErrosArea() {
    return new Chart("pie-area-erros", {
      type: 'pie',
      data: {
        labels: ["Fundamentos", "Matemática", "Tecnologia"],
        datasets: [{
          backgroundColor: ["#ff953e", "#cbe034", "#00d3b4"],
          data: [
            this.resultadosGerais.ResultadoFundamentos.Erros,
            this.resultadosGerais.ResultadoMatematica.Erros,
            this.resultadosGerais.ResultadoTecnologia.Erros,
          ]
        }]
      },
    });
  }

  getGraficoHorizontalDesempenhoDisciplinaAreaFundamentos() {

    let disciplinasFundamentos = [];
    let acertos = [];
    let erros = [];
    let colorAcertos = [];
    let colorErros = [];


    for (let i = 0; i < this.desempenhoDisciplinas.length; i++) {
      if (this.organizaDisciplinasPorArea(this.desempenhoDisciplinas[i].DisciplinaNome) == 0) {
        disciplinasFundamentos.push(this.desempenhoDisciplinas[i].DisciplinaNome)
        acertos.push(this.desempenhoDisciplinas[i].Acertos);
        erros.push(this.desempenhoDisciplinas[i].Erros);
        colorAcertos.push("green");
        colorErros.push("red");
      }
    }


    return new Chart("bar-chart-desempenho-disciplina-fundamentos", {
      type: 'horizontalBar',
      data: {
        labels: disciplinasFundamentos,
        datasets: [
          {
            label: "Acertos",
            backgroundColor: colorAcertos,
            data: acertos
          },
          {
            label: "Erros",
            backgroundColor: colorErros,
            data: erros
          }
        ]
      },
      options: {
        legend: { display: true },
      }
    });
  }

  getGraficoHorizontalDesempenhoDisciplinaAreaMatematica() {

    let disciplinasMatematica = [];
    let acertos = [];
    let erros = [];
    let colorAcertos = [];
    let colorErros = [];


    for (let i = 0; i < this.desempenhoDisciplinas.length; i++) {
      if (this.organizaDisciplinasPorArea(this.desempenhoDisciplinas[i].DisciplinaNome) == 1) {
        disciplinasMatematica.push(this.desempenhoDisciplinas[i].DisciplinaNome)
        acertos.push(this.desempenhoDisciplinas[i].Acertos);
        erros.push(this.desempenhoDisciplinas[i].Erros);
        colorAcertos.push("green");
        colorErros.push("red");
      }
    }

    return new Chart("bar-chart-desempenho-disciplina-matematica", {
      type: 'horizontalBar',
      data: {
        labels: disciplinasMatematica,
        datasets: [
          {
            label: "Acertos",
            backgroundColor: colorAcertos,
            data: acertos,
          },
          {
            label: "Erros",
            backgroundColor: colorErros,
            data: erros,
          }
        ]
      },
      options: {
        legend: { display: true },
      }
    });
  }

  getGraficoHorizontalDesempenhoDisciplinaAreaTecnologia() {

    let disciplinasTecnologia = [];
    let acertos = [];
    let erros = [];
    let colorAcertos = [];
    let colorErros = [];


    for (let i = 0; i < this.desempenhoDisciplinas.length; i++) {
      if (this.organizaDisciplinasPorArea(this.desempenhoDisciplinas[i].DisciplinaNome) == 2) {
        disciplinasTecnologia.push(this.desempenhoDisciplinas[i].DisciplinaNome)
        acertos.push(this.desempenhoDisciplinas[i].Acertos);
        erros.push(this.desempenhoDisciplinas[i].Erros);
        colorAcertos.push("green");
        colorErros.push("red");
      }
    }

    return new Chart("bar-chart-desempenho-disciplina-tecnologia", {
      type: 'horizontalBar',
      data: {
        labels: disciplinasTecnologia,
        datasets: [
          {
            label: "Acertos",
            backgroundColor: colorAcertos,
            data: acertos,
          },
          {
            label: "Erros",
            backgroundColor: colorErros,
            data: erros
          }

        ]
      },
      options: {
        legend: { display: true },
      }
    });
  }

  getSimuladoPorId(tipoSimulado: number) {
    return EProvaResultado[tipoSimulado];
  }

  getPdfEspecifico(grafico: string, nome: string) {

    var canvas = document.getElementById(grafico) as HTMLCanvasElement;
    var imagem = canvas.toDataURL("image/jpg");
    var doc = new jsPDF('landscape');

    doc.setFontSize(20);
    doc.addImage(imagem, 'jpg', 10, 10, 280, 150);
    doc.save(nome + '.pdf');
  }

  getPdfGraficoEspecifico(grafico: string, nome: string) {
    const doc = new jsPDF('l', 'mm', 'a4');

    //Titulo
    doc.setFontSize(50);
    doc.setFont("Courier");
    doc.setFont("bold");
    doc.setTextColor('rgb(47,158,64)')
    var text = "Relatório Específico"
    var textWidth = doc.getStringUnitWidth(text) * 50 / doc.internal.scaleFactor;
    var textOffset = (doc.internal.pageSize.width - textWidth) / 2;
    doc.text(text, textOffset, 80);

    //Tabela
    doc.setFillColor(50, 50, 50);
    doc.rect(textOffset, 120, 30, 8);
    doc.rect(textOffset, 128, 30, 8);
    doc.rect(textOffset, 136, 30, 8);
    doc.rect(textOffset, 144, 30, 8);
    doc.rect(textOffset, 152, 30, 8);
    doc.rect(textOffset, 120, 160, 8);
    doc.rect(textOffset, 128, 160, 8);
    doc.rect(textOffset, 136, 160, 8);
    doc.rect(textOffset, 144, 160, 8);
    doc.rect(textOffset, 152, 160, 8);

    //Atributos
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Nome", textOffset + 1, 125);
    doc.text("Email", textOffset + 1, 133);
    doc.text("Matrícula", textOffset + 1, 141);
    doc.text("Data de geração", textOffset + 1, 149);
    doc.text("Hora de geração", textOffset + 1, 157);

    doc.setTextColor(0, 0, 0);
    doc.text(this.usuario.Nome, textOffset + 32, 125);
    doc.text(this.usuario.Email, textOffset + 32, 133);
    doc.text(this.usuario.Matricula.toString(), textOffset + 32, 141);
    doc.text(this.formatDate(new Date()).toString(), textOffset + 32, 149);
    doc.text(this.formatTime(new Date()).toString(), textOffset + 32, 157);
    doc.addPage();

    html2canvas($(grafico)[0], {
      useCORS: true,
      allowTaint: true,
      scrollY: -window.scrollY,
    }).then(canvas => {
      const image = canvas.toDataURL('image/png', 1.0);
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      const widthRatio = pageWidth / canvas.width;
      const heightRatio = pageHeight / canvas.height;
      const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

      const canvasWidth = canvas.width * ratio;
      const canvasHeight = canvas.height * ratio;

      const marginX = (pageWidth - canvasWidth) / 2;
      const marginY = (pageHeight - canvasHeight) / 2;

      doc.addImage(image, 'PNG', marginX, marginY, canvasWidth, canvasHeight);
      doc.save(nome)
    });
  }

  getPdfGeral() {

    this.textoBotao = "Gerando relatórios...";

    this.carregar = true;
    const doc = new jsPDF('l', 'mm', 'a4');

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
    doc.rect(textOffset + 10, 152, 30, 8);
    doc.rect(textOffset + 10, 120, 160, 8);
    doc.rect(textOffset + 10, 128, 160, 8);
    doc.rect(textOffset + 10, 136, 160, 8);
    doc.rect(textOffset + 10, 144, 160, 8);
    doc.rect(textOffset + 10, 152, 160, 8);

    //Atributos
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Nome", textOffset + 12, 125);
    doc.text("Email", textOffset + 12, 133);
    doc.text("Matrícula", textOffset + 12, 141);
    doc.text("Data de geração", textOffset + 12, 149);
    doc.text("Hora de geração", textOffset + 12, 157);

    doc.setTextColor(0, 0, 0);
    doc.text(this.usuario.Nome, textOffset + 42, 125);
    doc.text(this.usuario.Email, textOffset + 42, 133);
    doc.text(this.usuario.Matricula.toString(), textOffset + 42, 141);
    doc.text(this.formatDate(new Date()).toString(), textOffset + 42, 149);
    doc.text(this.formatTime(new Date()).toString(), textOffset + 42, 157);
    doc.addPage();

    let size = 10;
    for (let i = 0; i < size; i++) {
      let grafico = '.grafico' + (1 + i);
      html2canvas($(grafico)[0], {
        useCORS: true,
        allowTaint: true,
        scrollY: -window.scrollY,
      }).then(canvas => {
        const image = canvas.toDataURL('image/png', 1.0);

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        const widthRatio = pageWidth / canvas.width;
        const heightRatio = pageHeight / canvas.height;
        const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

        const canvasWidth = canvas.width * ratio;
        const canvasHeight = canvas.height * ratio;

        const marginX = (pageWidth - canvasWidth) / 2;
        const marginY = (pageHeight - canvasHeight) / 2;

        doc.addImage(image, 'PNG', marginX, marginY, canvasWidth, canvasHeight);

        if (grafico == '.grafico10') {
          this.textoBotao = 'Gerar relatórios';
          doc.save('Relatório Completo')
          this.carregar = false;
        }
        doc.addPage();
      });
    }

  };

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

  organizaDisciplinasPorArea(disciplina: String) {
    switch (disciplina) {
      case "PROGRAMAÇÃO":
      case "ELETRÔNICA DIGITAL":
      case "ARQUITETURA E ORGANIZAÇÃO DE COMPUTADORES":
      case "LINGUAGENS E PARADIGMAS DE PROGRAMAÇÃO":
      case "ESTRUTURAS DE DADOS":
      case "SISTEMAS DISTRIBUÍDOS":
      case "TEORIA DA COMPUTAÇÃO":
      case "GRAFOS":
      case "SISTEMAS OPERACIONAIS": {
        //Disciplinas de Fundamentos
        return 0;
      }
      case "MATEMÁTICA DISCRETA":
      case "ÁLGEBRA LINEAR E GEOMETRIA ANALÍTICA":
      case "ESTATÍSTICA E PROBABILIDADE":
      case "CÁLCULO":
      case "CÁLCULO NUMÉRICO": {
        //Disciplinas de Matemática
        return 1;
      }
      case "BANCO DE DADOS":
      case "COMPILADORES":
      case "COMPUTAÇÃO GRÁFICA":
      case "ENGENHARIA DE SOFTWARE":
      case "INTELIGÊNCIA ARTIFICIAL":
      case "REDES DE COMPUTADORES":
      case "SEGURANÇA COMPUTACIONAL":
      case "SISTEMAS DISTRIBUÍDOS": {
        //Disciplinas de Tecnologia
        return 2;
      }
      default: {
        console.log(disciplina + "não existe");
        return -1;
      }
    }
  }

}
