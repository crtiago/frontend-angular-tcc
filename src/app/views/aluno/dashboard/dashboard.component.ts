import { EProvaResultado } from './../../../_enuns/eprovaresultado';
import { EProva } from './../../../_enuns/eprova';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from './../../../_servicos/resultados/dashboard.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
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

  constructor(private route: ActivatedRoute, private dashboardService: DashboardService) {
    if (this.route.snapshot.data['respostaResultados'][0].Sucesso &&
      this.route.snapshot.data['respostaResultados'][1].Sucesso &&
      this.route.snapshot.data['respostaResultados'][2].Sucesso) {

      this.ultimosResultados = this.route.snapshot.data['respostaResultados'][0].Data;
      this.resultadosGerais = this.route.snapshot.data['respostaResultados'][1].Data;
      this.desempenhoDisciplinas = this.route.snapshot.data['respostaResultados'][2].Data;
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
        labels: [["Fundamentos", " da Computação"], "Matemática", ["Tecnologia", " da Computação"]],
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
        labels: ["Fundamentos da Computação", "Matemática", "Tecnologia da Computação"],
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
        labels: ["Fundamentos da Computação", "Matemática", "Tecnologia da Computação"],
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
    return new Chart("bar-chart-desempenho-disciplina-fundamentos", {
      type: 'horizontalBar',
      data: {
        labels: [
          ["Arquitetura e", "Organização de Computadores"],
          "Eletrônica Digital",
          "Estruturas de Dados",
          "Grafos",
          ["Linguagens e", "Paradigmas de Programação"],
          "Programação",
          "Sistemas Operacionais",
          "Teoria da Computação"],
        datasets: [
          {
            label: "Acertos",
            backgroundColor: ["green", "green", "green", "green", "green", "green", "green", "green",],
            data: [
              this.desempenhoDisciplinas[4].Acertos,
              this.desempenhoDisciplinas[1].Acertos,
              this.desempenhoDisciplinas[6].Acertos,
              this.desempenhoDisciplinas[19].Acertos,
              this.desempenhoDisciplinas[5].Acertos,
              this.desempenhoDisciplinas[0].Acertos,
              this.desempenhoDisciplinas[7].Acertos,
              this.desempenhoDisciplinas[18].Acertos,
            ]
          },
          {
            label: "Erros",
            backgroundColor: ["red", "red", "red", "red", "red", "red", "red", "red",],
            data: [
              this.desempenhoDisciplinas[4].Erros,
              this.desempenhoDisciplinas[1].Erros,
              this.desempenhoDisciplinas[6].Erros,
              this.desempenhoDisciplinas[19].Erros,
              this.desempenhoDisciplinas[5].Erros,
              this.desempenhoDisciplinas[0].Erros,
              this.desempenhoDisciplinas[7].Erros,
              this.desempenhoDisciplinas[18].Erros,
            ]
          }
        ]
      },
      options: {
        legend: { display: true },
      }
    });
  }

  getGraficoHorizontalDesempenhoDisciplinaAreaMatematica() {
    return new Chart("bar-chart-desempenho-disciplina-matematica", {
      type: 'horizontalBar',
      data: {
        labels: [
          ["Álgebra Linear e", "Geometria Analítica"],
          "Cálculo Numérico",
          "Cálculo",
          ["Estatística e", "Probabilidade"],
          "Matemática Discreta",],
        datasets: [
          {
            label: "Acertos",
            backgroundColor: ["green", "green", "green", "green", "green"],
            data: [
              this.desempenhoDisciplinas[3].Acertos,
              this.desempenhoDisciplinas[20].Acertos,
              this.desempenhoDisciplinas[9].Acertos,
              this.desempenhoDisciplinas[13].Acertos,
              this.desempenhoDisciplinas[2].Acertos,
            ]
          },
          {
            label: "Erros",
            backgroundColor: ["red", "red", "red", "red", "red"],
            data: [
              this.desempenhoDisciplinas[3].Erros,
              this.desempenhoDisciplinas[20].Erros,
              this.desempenhoDisciplinas[9].Erros,
              this.desempenhoDisciplinas[13].Erros,
              this.desempenhoDisciplinas[2].Erros,
            ]
          }
        ]
      },
      options: {
        legend: { display: true },
      }
    });
  }

  getGraficoHorizontalDesempenhoDisciplinaAreaTecnologia() {
    return new Chart("bar-chart-desempenho-disciplina-tecnologia", {
      type: 'horizontalBar',
      data: {
        labels: [
          "Banco de Dados",
          "Compiladores",
          "Computação Gráfica",
          "Engenharia de Software",
          "Inteligência Artificial",
          "Redes de Computadores",
          "Segurança Computacional",
          "Sistemas Distribuídos",],
        datasets: [
          {
            label: "Acertos",
            backgroundColor: ["green", "green", "green", "green", "green", "green", "green", "green"],
            data: [
              this.desempenhoDisciplinas[10].Acertos,
              this.desempenhoDisciplinas[11].Acertos,
              this.desempenhoDisciplinas[14].Acertos,
              this.desempenhoDisciplinas[12].Acertos,
              this.desempenhoDisciplinas[16].Acertos,
              this.desempenhoDisciplinas[7].Acertos,
              this.desempenhoDisciplinas[15].Acertos,
              this.desempenhoDisciplinas[17].Acertos,
            ]
          },
          {
            label: "Erros",
            backgroundColor: ["red", "red", "red", "red", "red", "red", "red", "red"],
            data: [
              this.desempenhoDisciplinas[10].Erros,
              this.desempenhoDisciplinas[11].Erros,
              this.desempenhoDisciplinas[14].Erros,
              this.desempenhoDisciplinas[12].Erros,
              this.desempenhoDisciplinas[16].Erros,
              this.desempenhoDisciplinas[7].Erros,
              this.desempenhoDisciplinas[15].Erros,
              this.desempenhoDisciplinas[17].Erros,
            ]
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

    /*let canvas = document.getElementById(grafico) as HTMLCanvasElement;

    var a = document.createElement('a');
    a.href = canvas.toDataURL("image/jpg");
    a.download = nome;

    // Trigger the download
    a.click();*/
  }

  captureScreen() {
    var data = document.getElementById('canvas_div_pdf');
    html2canvas($(".canvas_div_pdf")[0], { allowTaint: true }).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });
  }

  getPdfGeral() {

    var HTML_Width = $(".canvas_div_pdf").width();
    var HTML_Height = $(".canvas_div_pdf").height();
    var top_left_margin = 15;
    var PDF_Width = HTML_Width + (top_left_margin * 2);
    var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;

    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;


    html2canvas($(".canvas_div_pdf")[0], { allowTaint: true }).then(function (canvas) {
      canvas.getContext('2d');

      console.log(canvas.height + "  " + canvas.width);

      var imgData = canvas.toDataURL("image/PNG", 1.0);
      var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
      pdf.addImage(imgData, 'PNG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);


      for (var i = 1; i <= totalPDFPages; i++) {
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
      }

      pdf.save("Desempenho do Usuario.pdf");
    });
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

}
