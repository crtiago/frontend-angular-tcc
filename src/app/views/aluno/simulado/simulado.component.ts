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
    localStorage.setItem('tipoSimulado', '0')
    this.router.navigateByUrl('/aluno/simuladopersonalizado');
  }

  criarSimuladoEnade() {
    this.spinnerPadrao = true;
    //Tempo Padrão - 2 horas
    localStorage.setItem('tempo', '7200')
    localStorage.setItem('tipoSimulado', '1')
    this.router.navigateByUrl('/aluno/simuladogerado');
  }

  criarSimuladoPoscomp() {
    this.spinnerPadrao = true;
    //Tempo Padrão - 2 horas
    localStorage.setItem('tempo', '7200')
    localStorage.setItem('tipoSimulado', '2')
    this.router.navigateByUrl('/aluno/simuladogerado');
  }

}
