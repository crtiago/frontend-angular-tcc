import { SalasService } from 'src/app/_servicos/salas/salas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SimuladoService } from './../../../_servicos/simulados/simulado.service';
import { AutenticacaoService } from './../../../_servicos/login/autenticacao.service';
import { first } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-simulados-sala',
  templateUrl: './lista-simulados-sala.component.html',
  styleUrls: ['./lista-simulados-sala.component.css']
})
export class ListaSimuladosSalaComponent implements OnInit, OnDestroy {

  linhaSelecionada: number;
  selecionado: boolean = false;
  listaSimulados = [];
  idSimuladoSelecionado: number;
  carregar: boolean = false;
  carregarGabarito: boolean = false;
  nenhumSimulado: boolean = false;
  enviosMaiorQueZero: boolean = false;

  constructor(private salasService: SalasService, private toastr: ToastrService, private autenticacaoService: AutenticacaoService, private simuladoService: SimuladoService, private router: Router, private route: ActivatedRoute) {
    if (sessionStorage.getItem("idSala") == '' || sessionStorage.getItem("idSala") == 'null' || sessionStorage.getItem("idSala") == null) {
      this.router.navigateByUrl('/prof/salas');
    } else {
      this.listaSimulados = JSON.parse(sessionStorage.getItem("simuladosSalaProfessor"));
      if (this.listaSimulados.length == 0) {
        this.nenhumSimulado = true;
      }
    }
  }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {

  }

  simuladoSelecionado(event: any, item: any, index: any) {
    this.linhaSelecionada = index;
    this.idSimuladoSelecionado = item.Id;
    this.selecionado = true;
    if (this.listaSimulados[this.linhaSelecionada].QuantidadeResposta > 0) {
      this.enviosMaiorQueZero = true;
    } else {
      this.enviosMaiorQueZero = false;
    }
  }

  buscarGabarito() {
    this.carregarGabarito = true;
    this.simuladoService.buscarGabaritoProf(this.idSimuladoSelecionado, this.autenticacaoService.getUsuario.IdUsuario).pipe(first()).subscribe(
      gabarito => {
        sessionStorage.setItem('gabarito', JSON.stringify(gabarito));
        this.router.navigateByUrl("/prof/gabarito");
        this.toastr.success('Gabarito gerado', '', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
      },
      error => {
        this.carregarGabarito = false;
        error = error.toString().replace("Error:", "");
        this.toastr.error(error, '', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
      });
  }

  buscarDesempenhoAlunos() {
    this.carregar = true;
    this.salasService.buscarResultadosSalaSimuladoProf(this.idSimuladoSelecionado).pipe(first()).subscribe(
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


  converterMinutosEmSegundos(minutos: number) {
    return minutos * 60;
  }


}
