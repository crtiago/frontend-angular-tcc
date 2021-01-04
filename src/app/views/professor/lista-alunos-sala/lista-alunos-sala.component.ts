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
import jsPDF from 'jspdf';

@Component({
  selector: 'app-lista-alunos-sala',
  templateUrl: './lista-alunos-sala.component.html',
  styleUrls: ['./lista-alunos-sala.component.css']
})
export class ListaAlunosSalaComponent implements OnInit {

  prova: string;
  listaAlunos: any[];
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

    var nomeSimulado = sessionStorage.getItem('nomeSimulado');

    if (nomeSimulado == null) {
      nomeSimulado = 'Simulado';
    }

    this.carregar = true;
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
    doc.rect(textOffset + 10, 120, 40, 8);
    doc.rect(textOffset + 10, 128, 40, 8);
    doc.rect(textOffset + 10, 136, 40, 8);
    doc.rect(textOffset + 10, 144, 40, 8);
    doc.rect(textOffset + 10, 152, 40, 8);
    doc.rect(textOffset + 10, 120, 160, 8);
    doc.rect(textOffset + 10, 128, 160, 8);
    doc.rect(textOffset + 10, 136, 160, 8);
    doc.rect(textOffset + 10, 144, 160, 8);
    doc.rect(textOffset + 10, 152, 160, 8);

    //Atributos
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Professor", textOffset + 12, 125);
    doc.text("Email", textOffset + 12, 133);
    doc.text("Data de geração", textOffset + 12, 141);
    doc.text("Hora de geração", textOffset + 12, 149);
    doc.text("Nome do Simulado", textOffset + 12, 157);

    doc.setTextColor(0, 0, 0);
    doc.text(this.professor.Nome, textOffset + 52, 125);
    doc.text(this.professor.Email, textOffset + 52, 133);
    doc.text(this.formatDate(new Date()).toString(), textOffset + 52, 141);
    doc.text(this.formatTime(new Date()).toString(), textOffset + 52, 149);
    doc.text(String(nomeSimulado), textOffset + 52, 157);


    var y = 45;
    for (let i = 0; i < this.listaAlunos.length; i++) {
      doc.addPage();
      y = y + 8;
      //Tabela
      doc.setFillColor(50, 50, 50);
      //Linha Data de Envio
      doc.rect(textOffset + 10, y - 8, 40, 8);
      //Linha Nome
      doc.rect(textOffset + 10, y, 40, 8);

      //Linha Desempenho Geral
      doc.rect(textOffset + 10, y + 8, 160, 8);
      //Linha Acertos Geral
      doc.rect(textOffset + 10, y + 16, 40, 8);
      //Linha Erros Geral
      doc.rect(textOffset + 10, y + 24, 40, 8);
      //Linha Nao Respodidas Geral
      doc.rect(textOffset + 10, y + 32, 40, 8);
      //Linha Total de Questões Geral
      doc.rect(textOffset + 10, y + 40, 40, 8);

      //Linha Acertos Fundamentos
      doc.rect(textOffset + 10, y + 56, 40, 8);
      //Linha Erros Fundamentos
      doc.rect(textOffset + 10, y + 64, 40, 8);
      //Linha Nao Respondidas Fundamentos
      doc.rect(textOffset + 10, y + 72, 40, 8);
      //Linha Total de Questoes Fundamentos
      doc.rect(textOffset + 10, y + 80, 40, 8);

      //Linha Acertos Matematica
      doc.rect(textOffset + 10, y + 96, 40, 8);
      //Linha Erros Matematica
      doc.rect(textOffset + 10, y + 104, 40, 8);
      //Linha Nao Respondidas Matematica
      doc.rect(textOffset + 10, y + 112, 40, 8);
      //Linha Total de Questoes Matematica
      doc.rect(textOffset + 10, y + 120, 40, 8);

      //Linha Acertos Tecnologia
      doc.rect(textOffset + 10, y + 136, 40, 8);
      //Linha Erros Tecnologia
      doc.rect(textOffset + 10, y + 144, 40, 8);
      //Linha Nao Respondidas Tecnologia
      doc.rect(textOffset + 10, y + 152, 40, 8);
      //Linha Total de Questoes Tecnologia
      doc.rect(textOffset + 10, y + 160, 40, 8);

      //Resposta

      //Linha Data de Envio
      doc.rect(textOffset + 10, y - 8, 160, 8);
      //Linha Resposta Nome
      doc.rect(textOffset + 10, y, 160, 8);

      //Linha Resposta Acertos Geral
      doc.rect(textOffset + 10, y + 16, 160, 8);
      //Linha Resposta Erros Geral
      doc.rect(textOffset + 10, y + 24, 160, 8);
      //Linha Nao Respodidas Geral
      doc.rect(textOffset + 10, y + 32, 160, 8);
      //Linha Total de Questões Geral
      doc.rect(textOffset + 10, y + 40, 160, 8);

      //Linha Fundamentos
      doc.rect(textOffset + 10, y + 48, 160, 8);
      //Linha Acertos Fundamentos
      doc.rect(textOffset + 10, y + 56, 160, 8);
      //Linha Erros Fundamentos
      doc.rect(textOffset + 10, y + 64, 160, 8);
      //Linha Erros Fundamentos
      doc.rect(textOffset + 10, y + 72, 160, 8);
      //Linha Total de Questoes Fundamentos
      doc.rect(textOffset + 10, y + 80, 160, 8);

      //Linha Matematica
      doc.rect(textOffset + 10, y + 88, 160, 8);
      //Linha Acertos Matematica
      doc.rect(textOffset + 10, y + 96, 160, 8);
      //Linha Erros Matematica
      doc.rect(textOffset + 10, y + 104, 160, 8);
      //Linha Nao Respondidas Matematica
      doc.rect(textOffset + 10, y + 112, 160, 8);
      //Linha Total de Questoes  Matematica
      doc.rect(textOffset + 10, y + 120, 160, 8);

      //Linha Tecnologia
      doc.rect(textOffset + 10, y + 128, 160, 8);
      //Linha Acertos Tecnologia
      doc.rect(textOffset + 10, y + 136, 160, 8);
      //Linha Erros Tecnologia
      doc.rect(textOffset + 10, y + 144, 160, 8);
      //Linha Nao Respondidas Tecnologia
      doc.rect(textOffset + 10, y + 152, 160, 8);
      //Linha Total de Questoes Tecnologia
      doc.rect(textOffset + 10, y + 160, 160, 8);


      //Atributos
      doc.setFont("bold");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text('Data de Envio', textOffset + 12, y - 2);
      doc.text('Aluno', textOffset + 12, y + 6);
      doc.text('Desempenho Geral', textOffset + 75, y + 15);
      doc.setTextColor('rgb(47,158,64)')
      doc.text('Acertos', textOffset + 12, y + 23);
      doc.setTextColor('rgb(220,53,69)')
      doc.text('Erros', textOffset + 12, y + 31);
      doc.setTextColor('rgb(23,162,184)');
      doc.text('Não Respondidas', textOffset + 12, y + 39);
      doc.setTextColor(0, 0, 0);
      doc.text('Total de Questões', textOffset + 12, y + 47);
      doc.text('Fundamentos da Computação', textOffset + 68, y + 55);
      doc.setTextColor('rgb(47,158,64)')
      doc.text('Acertos', textOffset + 12, y + 63);
      doc.setTextColor('rgb(220,53,69)')
      doc.text('Erros', textOffset + 12, y + 71);
      doc.setTextColor('rgb(23,162,184)');
      doc.text('Não Respondidas', textOffset + 12, y + 79);
      doc.setTextColor(0, 0, 0);
      doc.text('Total de Questões', textOffset + 12, y + 87);
      doc.text('Matemática', textOffset + 83, y + 95);
      doc.setTextColor('rgb(47,158,64)')
      doc.text('Acertos', textOffset + 12, y + 103);
      doc.setTextColor('rgb(220,53,69)')
      doc.text('Erros', textOffset + 12, y + 111);
      doc.setTextColor('rgb(23,162,184)');
      doc.text('Não Respondidas', textOffset + 12, y + 119);
      doc.setTextColor(0, 0, 0);
      doc.text('Total de Questões', textOffset + 12, y + 127);
      doc.text('Tecnologia da Computação', textOffset + 69, y + 135);
      doc.setTextColor('rgb(47,158,64)')
      doc.text('Acertos', textOffset + 12, y + 143);
      doc.setTextColor('rgb(220,53,69)')
      doc.text('Erros', textOffset + 12, y + 151);
      doc.setTextColor('rgb(23,162,184)');
      doc.text('Não Respondidas', textOffset + 12, y + 159);
      doc.setTextColor(0, 0, 0);
      doc.text('Total de Questões', textOffset + 12, y + 167);

      doc.setTextColor(0, 0, 0);
      doc.text(String(this.formatDate(this.listaAlunos[i].DataEnvio)), textOffset + 52, y - 2);
      doc.text(this.listaAlunos[i].Nome, textOffset + 52, y + 6);
      //Geral
      doc.text(String(this.listaAlunos[i].ResultadoGeral.Acertos), textOffset + 52, y + 23);
      doc.text(String(this.listaAlunos[i].ResultadoGeral.Erros), textOffset + 52, y + 31);
      doc.text(String(this.listaAlunos[i].ResultadoGeral.NaoRespondidas), textOffset + 52, y + 39);
      doc.text(String(this.listaAlunos[i].ResultadoGeral.TotalQuestao), textOffset + 52, y + 47);
      //Fundamentos
      doc.text(String(this.listaAlunos[i].ResultadoFundamentos.Acertos), textOffset + 52, y + 63);
      doc.text(String(this.listaAlunos[i].ResultadoFundamentos.Erros), textOffset + 52, y + 71);
      doc.text(String(this.listaAlunos[i].ResultadoFundamentos.NaoRespondidas), textOffset + 52, y + 79);
      doc.text(String(this.listaAlunos[i].ResultadoFundamentos.TotalQuestao), textOffset + 52, y + 87);
      //Matematica
      doc.text(String(this.listaAlunos[i].ResultadoMatematica.Acertos), textOffset + 52, y + 103);
      doc.text(String(this.listaAlunos[i].ResultadoMatematica.Erros), textOffset + 52, y + 111);
      doc.text(String(this.listaAlunos[i].ResultadoMatematica.NaoRespondidas), textOffset + 52, y + 119);
      doc.text(String(this.listaAlunos[i].ResultadoMatematica.TotalQuestao), textOffset + 52, y + 127);
      //Tecnologia
      doc.text(String(this.listaAlunos[i].ResultadoTecnologia.Acertos), textOffset + 52, y + 143);
      doc.text(String(this.listaAlunos[i].ResultadoTecnologia.Erros), textOffset + 52, y + 151);
      doc.text(String(this.listaAlunos[i].ResultadoTecnologia.NaoRespondidas), textOffset + 52, y + 159);
      doc.text(String(this.listaAlunos[i].ResultadoTecnologia.TotalQuestao), textOffset + 52, y + 167);
    }

    doc.save('Relatório.pdf');
    this.carregar = false;

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
