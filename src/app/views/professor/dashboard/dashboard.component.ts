import { first } from 'rxjs/operators';
import { SalasService } from 'src/app/_servicos/salas/salas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private router: Router, private toastr: ToastrService, private route: ActivatedRoute, private salasService: SalasService) {
    this.listaSalas = this.route.snapshot.data.response.Data;
    if (this.listaSalas.length == 0) {
      this.nenhumaSala = true;
    } else {
      this.nenhumaSala = false;
    }
  }

  ngOnInit() { }

  buscarResultadoGeralPorSala() {
    //Atualizar para quando trocar de sala
    this.salasService.buscarResultadoGeralPorSala(this.salaSelecionada.Id).pipe(first()).subscribe(
      resposta => {
        this.resultadoGeralSala = resposta.Data;
        this.buscarListaSimulados();
      },
      error => {
        this.salaSelecionadaBoolean = false;
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
        //this.salaSelecionadaBoolean = true;
        this.listaSimulados = resposta.Data;
        this.salaSelecionadaBoolean = true;
        if (this.listaSimulados.length == 0) {
          this.nenhumSimulado = true;
        } else {
          this.nenhumSimulado = false;
        }
      },
      error => {
        // this.salaSelecionadaBoolean = false;
        error = error.toString().replace("Error:", "");
        this.toastr.error(error, '', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
      });
  }

  buscarResultadoSimulado() {

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


}
