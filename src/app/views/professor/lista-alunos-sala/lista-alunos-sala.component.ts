import { AutenticacaoService } from './../../../_servicos/login/autenticacao.service';
import { Chart } from 'chart.js';
import { first } from 'rxjs/operators';
import { SalasService } from 'src/app/_servicos/salas/salas.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { EArea } from './../../../_enuns/earea';
import { EProva } from './../../../_enuns/eprova';
import { EDisciplinaId } from './../../../_enuns/edisciplinasid';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-alunos-sala',
  templateUrl: './lista-alunos-sala.component.html',
  styleUrls: ['./lista-alunos-sala.component.css']
})
export class ListaAlunosSalaComponent implements OnInit {

  prova: string;
  listaAlunos: [];
  carregar: boolean = false;
  professor: any;

  //Variaveis do gráfico de disciplina
  disciplinasInteresseProf = [];
  acertos = [];
  erros = [];
  colorAcertos = [];
  colorErros = [];

  constructor(private toastr: ToastrService, private salasService: SalasService, private router: Router,) {
    this.listaAlunos = JSON.parse(sessionStorage.getItem('listaAlunos'));
    this.professor = JSON.parse(sessionStorage.getItem('usuario'));
    //Caso o listaAlunos esteja null ele retorna para a lista de simulados
    if (this.listaAlunos == null || this.listaAlunos == [""]) {
      this.router.navigate(['prof/salas']);
    }
  }

  ngOnDestroy(): void {
    sessionStorage.setItem('listaAlunos', null);
  }

  ngOnInit() {
  }

  getArea(index: number) {
    return EArea[index];
  }

  getDisciplina(index: number) {
    return EDisciplinaId[index];
  }

  getProva(index: number) {
    return EProva[index];
  }

  buscarResultadoSalaSimuladoAlunoEspecifico(IdAluno: number, IdSimulado: number, i: number) {
    this.carregar = true;
    this.salasService.buscarResultadoSalaSimuladoAlunoEspecifico(IdAluno, IdSimulado).pipe(first()).subscribe(
      resposta => {
        this.carregar = false;
        this.getGraficoCirculoDesempenhoGeral(resposta.Data, i);
        this.getGraficoHorizontalDesempenhoDisciplina(resposta.Data, i);
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
