import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { SalasService } from 'src/app/_servicos/salas/salas.service';

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
    //Atualizar para quando trocar de sala
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
