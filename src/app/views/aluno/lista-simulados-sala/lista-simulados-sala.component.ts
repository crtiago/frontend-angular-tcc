import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { SimuladoService } from './../../../_servicos/simulados/simulado.service';
import { AutenticacaoService } from './../../../_servicos/login/autenticacao.service';
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
  respondido: boolean = false;
  listaSimulados = [];
  idSimuladoSelecionado: number;
  carregar: boolean = false;
  carregarGabarito: boolean = false;
  tipoSimulado: number;
  nenhumSimulado: boolean = false;
  prazoExpirado: boolean = false;

  constructor(private toastr: ToastrService, private autenticacaoService: AutenticacaoService, private simuladoService: SimuladoService, private router: Router, private route: ActivatedRoute) {
    if (sessionStorage.getItem("idSala") == '' || sessionStorage.getItem("idSala") == 'null') {
      this.router.navigateByUrl('/aluno/salas');
    } else {
      this.listaSimulados = JSON.parse(sessionStorage.getItem("simuladosSalaAluno"));
      if (this.listaSimulados.length == 0) {
        this.nenhumSimulado = true;
      }
    }
  }

  ngOnDestroy(): void {
    sessionStorage.setItem("idSala", '');
    sessionStorage.setItem("simuladosSalaAluno", '');
  }

  ngOnInit(): void {

  }

  simuladoSelecionado(event: any, item: any, index: any) {
    this.linhaSelecionada = index;
    const prazo = new Date(item.DataFimSimulado);
    const hoje = new Date();
    if (prazo < hoje) {
      this.prazoExpirado = true;
      this.selecionado = false;
      if (item.SimuladoRespondido) {
        this.idSimuladoSelecionado = item.Id;
        this.respondido = true;
      } else {
        this.toastr.error("Prazo para responder a esse simulado se encerrou.", '', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
      }
    } else if (!item.SimuladoRespondido) {
      this.prazoExpirado = false;
      this.respondido = false;
      this.selecionado = true;
      this.idSimuladoSelecionado = item.Id;
      this.tipoSimulado = item.TipoSimulado;
    } else {
      this.prazoExpirado = false;
      this.idSimuladoSelecionado = item.Id;
      this.respondido = true;
      this.selecionado = false;
    }
  }

  iniciarSimuladoSelecionado() {
    this.carregar = true;
    this.simuladoService.buscarQuestoesSimuladoId(this.idSimuladoSelecionado).pipe(first()).subscribe(
      simulado => {
        //Salva o id do simulado para usar posteriormente
        sessionStorage.setItem('idSimulado', JSON.stringify(this.idSimuladoSelecionado));
        this.verificarTipoSimulado();
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

  verificarTipoSimulado() {
    sessionStorage.setItem('respostas', '[]');
    if (this.tipoSimulado == 0) {
      let simulado = this.simuladoService.getSimuladoValor;
      sessionStorage.setItem('tempo', JSON.stringify(simulado.TempoMaximo))
      sessionStorage.setItem('tipoSimulado', '0')
      //Setando o progresso do usuário para 0, pois ele está iniciando
      sessionStorage.setItem('progresso', '0');
      this.router.navigateByUrl('/aluno/simuladogerado');
      this.toastr.success('Simulado gerado', '', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',
      });
    } else if (this.tipoSimulado == 1) {
      //Tempo Padrão - 4 horas
      sessionStorage.setItem('tempo', '14400')
      sessionStorage.setItem('tipoSimulado', '1')
      //Setando o progresso do usuário para 0, pois ele está iniciando
      sessionStorage.setItem('progresso', '0');
      this.router.navigateByUrl('/aluno/simuladogerado');
      this.toastr.success('Simulado gerado', '', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',
      });
    } else {
      sessionStorage.setItem('index', JSON.stringify(0));
      //Tempo Padrão - 4 horas
      sessionStorage.setItem('tempo', '14400')
      sessionStorage.setItem('tipoSimulado', '2')
      //Setando o progresso do usuário para 0, pois ele está iniciando
      sessionStorage.setItem('progresso', '0');
      this.router.navigateByUrl("/aluno/simuladogerado");
      this.toastr.success('Simulado gerado', '', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',
      });
    }
  }

  buscarGabarito() {
    this.carregarGabarito = true;
    this.simuladoService.buscarGabarito(this.idSimuladoSelecionado, this.autenticacaoService.getUsuario.IdUsuario).pipe(first()).subscribe(
      gabarito => {
        sessionStorage.setItem("idSimuladoGabarito", JSON.stringify(0));
        sessionStorage.setItem('gabarito', JSON.stringify(gabarito));
        this.router.navigateByUrl("/aluno/gabarito");
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
