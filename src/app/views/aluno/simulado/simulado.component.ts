import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulado',
  templateUrl: './simulado.component.html',
  styleUrls: ['./simulado.component.css']
})
export class SimuladoComponent implements OnInit {

  spinnerPadrao = false;
  spinnerPersonalizado = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  criarSimuladoPersonalizado() {
    this.spinnerPersonalizado = true;
    sessionStorage.setItem('tipoSimulado', '0')
    this.router.navigateByUrl('/aluno/simuladopersonalizado');
  }

  criarSimuladoEnade() {
    this.spinnerPadrao = true;
    //Tempo Padrão - 2 horas
    sessionStorage.setItem('tempo', '7200')
    sessionStorage.setItem('tipoSimulado', '1')
    //Setando o progresso do usuário para 0, pois ele está iniciando
    sessionStorage.setItem('progresso', '0');
    this.router.navigateByUrl('/aluno/simuladogerado');
  }

  criarSimuladoPoscomp() {
    this.spinnerPadrao = true;
    //Tempo Padrão - 2 horas
    sessionStorage.setItem('tempo', '7200')
    sessionStorage.setItem('tipoSimulado', '2')
    //Setando o progresso do usuário para 0, pois ele está iniciando
    sessionStorage.setItem('progresso', '0');
    this.router.navigateByUrl('/aluno/simuladogerado');
  }

}
