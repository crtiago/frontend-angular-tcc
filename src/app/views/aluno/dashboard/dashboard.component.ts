import { EProvaResultado } from './../../../_enuns/eprovaresultado';
import { EProva } from './../../../_enuns/eprova';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from './../../../_servicos/resultados/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  resultadosGerais: any;
  ultimosResultados: any[];

  constructor(private route: ActivatedRoute, private dashboardService: DashboardService) {
    this.ultimosResultados = this.route.snapshot.data['respostaResultados'][0].Data;
    this.resultadosGerais = this.route.snapshot.data['respostaResultados'][1].Data;
  }

  ngOnInit() {
    this.getGraficoBarraDesempenhoUltimos();
    this.getGraficoCirculoDesempenhoGeral();
    this.getGraficosAcertosArea();
    this.getGraficosErrosArea();
    this.getGraficoSetoresAcertosDisciplinas();
    this.getGraficoSetoresErrosDisciplinas();
  }

  getGraficosAcertosArea() {
    return new Chart("pie-area-acertos", {
      type: 'pie',
      data: {
        labels: ["Fundamentos da Computação", "Matemática", "Tecnologia da Computação"],
        datasets: [{
          backgroundColor: ["#3cba9f", "#8e5ea2", "#c45850"],
          data: [
            this.resultadosGerais.ResultadoFundamentos.Acertos,
            this.resultadosGerais.ResultadoMatematica.Acertos,
            this.resultadosGerais.ResultadoTecnologia.Acertos,
          ]
        }]
      },
    });
  }

  getGraficosErrosArea() {
    return new Chart("pie-area-erros", {
      type: 'pie',
      data: {
        labels: ["Fundamentos da Computação", "Matemática", "Tecnologia da Computação"],
        datasets: [{
          backgroundColor: ["#3cba9f", "#8e5ea2", "#c45850"],
          data: [
            this.resultadosGerais.ResultadoFundamentos.Erros,
            this.resultadosGerais.ResultadoMatematica.Erros,
            this.resultadosGerais.ResultadoTecnologia.Erros,
          ]
        }]
      },
    });
  }

  getGraficoBarraDesempenhoUltimos() {
    return new Chart('chart-bar', {
      type: 'bar',
      data: {
        labels: [
          this.formatDate(this.ultimosResultados[0].DataEnvio),
          this.formatDate(this.ultimosResultados[1].DataEnvio),
          this.formatDate(this.ultimosResultados[2].DataEnvio),
          this.formatDate(this.ultimosResultados[3].DataEnvio),
          this.formatDate(this.ultimosResultados[4].DataEnvio),
        ],
        datasets: [{
          label: 'Acertos',
          data: [
            this.ultimosResultados[0].ResultadoGeral.Acertos,
            this.ultimosResultados[1].ResultadoGeral.Acertos,
            this.ultimosResultados[2].ResultadoGeral.Acertos,
            this.ultimosResultados[3].ResultadoGeral.Acertos,
            this.ultimosResultados[4].ResultadoGeral.Acertos],
          backgroundColor: 'green',
          borderColor: 'green',
          borderWidth: 2
        },
        {
          label: 'Erros',
          data: [
            this.ultimosResultados[0].ResultadoGeral.Erros,
            this.ultimosResultados[1].ResultadoGeral.Erros,
            this.ultimosResultados[2].ResultadoGeral.Erros,
            this.ultimosResultados[3].ResultadoGeral.Erros,
            this.ultimosResultados[4].ResultadoGeral.Erros
          ],
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
          position: 'bottom',
          display: false
        },
      }
    });
  }

  getGraficoCirculoDesempenhoGeral() {
    return new Chart('chart-doughnut', {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [this.resultadosGerais.ResultadoGeral.Acertos, this.resultadosGerais.ResultadoGeral.Erros, this.resultadosGerais.ResultadoGeral.NaoRespondidas],
          backgroundColor: ["green", "red", "#36a2eb"],
        }],
        labels: [
          'Acertos',
          'Erros',
          'Não respondidas'
        ]
      },
      options: {
        legend: {
          position: 'bottom',
          display: false
        },
        cutoutPercentage: 80
      }
    });
  }

  getGraficoSetoresAcertosDisciplinas() {
    return new Chart("pie-acertos", {
      type: 'pie',
      data: {
        labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
        datasets: [{
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
          data: [2478, 5267, 734, 784, 433]
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Predicted world population (millions) in 2050'
        }
      }
    });
  }

  getGraficoSetoresErrosDisciplinas() {
    return new Chart("pie-erros", {
      type: 'pie',
      data: {
        labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
        datasets: [{
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
          data: [2478, 5267, 734, 784, 433]
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Predicted world population (millions) in 2050'
        }
      }
    });
  }

  getSimuladoPorId(tipoSimulado: number) {
    return EProvaResultado[tipoSimulado];
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

}
