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
  nenhumResultado: boolean = true;


  constructor(private route: ActivatedRoute, private dashboardService: DashboardService) {
    if (this.route.snapshot.data['respostaResultados'][0].Sucesso && this.route.snapshot.data['respostaResultados'][1].Sucesso) {
      this.ultimosResultados = this.route.snapshot.data['respostaResultados'][0].Data;
      this.resultadosGerais = this.route.snapshot.data['respostaResultados'][1].Data;
      this.nenhumResultado = false;
    } else {
      this.nenhumResultado = true;
    }

  }

  ngOnInit() {
    if (this.route.snapshot.data['respostaResultados'][0].Sucesso && this.route.snapshot.data['respostaResultados'][1].Sucesso) {
      this.getGraficoLinha();
      this.getGraficoBarraDesempenhoUltimos();
      this.getGraficoCirculoDesempenhoGeral();
      this.getGraficoBarraHorizontal();
      this.getGraficoAcertosArea();
      this.getGraficoErrosArea();
      this.getGraficoSetoresAcertosDisciplinas();
      this.getGraficoSetoresErrosDisciplinas();
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
          position: 'bottom',
          display: false
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

  getGraficoBarraHorizontal() {
    return new Chart("bar-chart-horizontal", {
      type: 'horizontalBar',
      data: {
        labels: ["Fundamentos da Computação", "Matemática", "Tecnologia da Computação",],
        datasets: [
          {
            label: "Acertos",
            backgroundColor: ["#ff953e", "#cbe034", "#00d3b4"],
            data: [
              this.resultadosGerais.ResultadoFundamentos.Acertos,
              this.resultadosGerais.ResultadoMatematica.Acertos,
              this.resultadosGerais.ResultadoTecnologia.Acertos,
            ]
          }
        ]
      },
      options: {
        legend: { display: false },
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

  formatTime(date) {
    var d = new Date(date);
    let datetext = d.toTimeString();

    datetext = datetext.split(' ')[0];
    return datetext;
  }

}
