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
  salaSelecionadaBoolean: boolean = false;
  simuladoSelecionadoBoolean: boolean = false;
  idSimuladoSelecionado: number;
  carregar: boolean = false;
  salaSelecionada: any;
  simuladoSelecionado: any;
  quantidadeResposta: number = 0;

  constructor(private router: Router, private toastr: ToastrService, private route: ActivatedRoute, private salasService: SalasService) {
    this.listaSalas = this.route.snapshot.data.response.Data;
  }

  ngOnInit() { }

  buscarListaSimulados() {
    this.salasService.buscarSimuladosPorSala(this.salaSelecionada.Id).pipe(first()).subscribe(
      resposta => {
        this.salaSelecionadaBoolean = true;
        this.listaSimulados = resposta.Data;
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

  buscarResultadoSimulado() {
    console.log(this.simuladoSelecionado)
    this.simuladoSelecionadoBoolean = true;
    this.quantidadeResposta = Number(this.simuladoSelecionado.QuantidadeResposta);
    console.log(this.quantidadeResposta)
  }

  buscarDesempenhoAlunos() {
    this.carregar = true;
    this.salasService.buscarResultadosSalaSimuladoProf(this.simuladoSelecionado.Id).pipe(first()).subscribe(
      listaAlunos => {
        sessionStorage.setItem('listaAlunos', JSON.stringify(listaAlunos.Data));
        this.router.navigateByUrl("/prof/alunossimulado");
        this.toastr.success('Lista de alunos gerada', '', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
        this.carregar = false;
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


}
