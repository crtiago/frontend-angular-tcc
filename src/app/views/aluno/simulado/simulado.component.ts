import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulado',
  templateUrl: './simulado.component.html',
  styleUrls: ['./simulado.component.css']
})
export class SimuladoComponent implements OnInit {
  
  defaultImage = '../../../assets/img/imagem-padrao.svg';
  image = '../../../assets/img/exame.svg';

  spinnerPadrao = false;
  spinnerPersonalizado = false;

  constructor(private router: Router) { }

  ngOnInit(){
  }

  criarSimuladoPadrao(){
    this.spinnerPadrao = true;
    //this.router.navigate(['simuladogerado']);
    this.router.navigateByUrl('/aluno/simuladogerado');
  }

  criarSimuladoPersonalizado(){
    this.spinnerPersonalizado = true;
    this.router.navigateByUrl('/aluno/simuladopersonalizado');
  }

}
