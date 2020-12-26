import { first } from 'rxjs/operators';
import { AutenticacaoService } from './../../../_servicos/login/autenticacao.service';
import { SimuladoService } from './../../../_servicos/simulados/simulado.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simulado-concluido',
  templateUrl: './simulado-concluido.component.html',
  styleUrls: ['./simulado-concluido.component.css']
})
export class SimuladoConcluidoComponent implements OnInit {

  idSimuladoGabarito: number;
  carregarGabarito: boolean = false;
  desabilitar = false;

  constructor(private simuladoService: SimuladoService, private router: Router, private autenticacaoService: AutenticacaoService) {
    if (Number(sessionStorage.getItem('idSimuladoGabarito')) == 0) {
      this.desabilitar = true;
    } else {
      this.idSimuladoGabarito = Number(sessionStorage.getItem('idSimuladoGabarito'));
    }
  }

  ngOnInit(): void {
  }

  buscarGabarito() {
    this.carregarGabarito = true;
    this.simuladoService.buscarGabarito(this.idSimuladoGabarito, this.autenticacaoService.getUsuario.IdUsuario).pipe(first()).subscribe(
      gabarito => {
        sessionStorage.setItem('gabarito', JSON.stringify(gabarito));
        this.router.navigateByUrl("/aluno/gabarito");
      },
      error => {
        this.carregarGabarito = false;
        console.log(error);
      });
  }

}
