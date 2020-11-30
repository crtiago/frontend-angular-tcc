import { first } from 'rxjs/operators';
import { SimuladoService } from './../../../_servicos/simulados/simulado.service';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-lista-simulados',
  templateUrl: './lista-simulados.component.html',
  styleUrls: ['./lista-simulados.component.css']
})

export class ListaSimuladosComponent implements OnInit {

  linhaSelecionada: number;
  selecionado: boolean = false;
  listaSimulados = [];
  idSimuladoSelecionado: number;
  carregar: boolean = false;
  tipoSimulado: number;

  constructor(private simuladoService: SimuladoService, private router: Router) {

    this.simuladoService.buscarListaSimulados().pipe(first()).subscribe(
      listaSimulados => {
        this.listaSimulados = listaSimulados.Data;
      },
      error => {
        console.log(error);
      });
  }

  ngOnInit(): void {
  }

  simuladoSelecionado(event: any, item: any, index: any) {
    this.linhaSelecionada = index;
    this.selecionado = true;
    this.idSimuladoSelecionado = item.Id;
    this.tipoSimulado = item.TipoSimulado;
  }

  iniciarSimuladoSelecionado() {
    this.carregar = true;
    this.simuladoService.buscarQuestoesSimuladoId(this.idSimuladoSelecionado).pipe(first()).subscribe(
      simulado => {
        this.verificarTipoSimulado();
      },
      error => {
        this.carregar = false;
        console.log(error);
      });
  }
  
  verificarTipoSimulado(){
    if (this.tipoSimulado == 0) {
      sessionStorage.setItem('tipoSimulado', '0')
      //Converter tempo
      //let tempo = this.converterMinutosEmSegundos(this.formularioDeUsuario.get('tempoSimulado').value);
      //sessionStorage.setItem('tempo', JSON.stringify(tempo));
      //Setando o progresso do usuário para 0, pois ele está iniciando
      sessionStorage.setItem('progresso', '0');
    } else if (this.tipoSimulado == 1) {
      //Tempo Padrão - 4 horas
      sessionStorage.setItem('tempo', '14400')
      sessionStorage.setItem('tipoSimulado', '1')
      //Setando o progresso do usuário para 0, pois ele está iniciando
      sessionStorage.setItem('progresso', '0');
      this.router.navigateByUrl('/aluno/simuladogerado');
    } else {
      sessionStorage.setItem('index', JSON.stringify(0));
      //Tempo Padrão - 4 horas
      sessionStorage.setItem('tempo', '14400')
      sessionStorage.setItem('tipoSimulado', '2')
      //Setando o progresso do usuário para 0, pois ele está iniciando
      sessionStorage.setItem('progresso', '0');
      this.router.navigateByUrl("/aluno/simuladogerado");
    }
  }

  converterMinutosEmSegundos(minutos: number) {
    return minutos * 60;
  }

}
