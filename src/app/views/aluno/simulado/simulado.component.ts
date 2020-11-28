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

  ngOnInit(){
  }

  criarSimuladoPadrao(){
    this.spinnerPadrao = true;
    //Tempo Padrão - 2 horas
    localStorage.setItem('tempo', '7200')
    this.router.navigateByUrl('/aluno/simuladogerado');
  }

  criarSimuladoPersonalizado(){
    this.spinnerPersonalizado = true;
    this.router.navigateByUrl('/aluno/simuladopersonalizado');
  }

}
