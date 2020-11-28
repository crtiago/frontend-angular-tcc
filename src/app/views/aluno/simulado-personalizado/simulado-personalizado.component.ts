import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulado-personalizado',
  templateUrl: './simulado-personalizado.component.html',
  styleUrls: ['./simulado-personalizado.component.css']
})
export class SimuladoPersonalizadoComponent implements OnInit {

  carregar = false;
  formularioDeUsuario: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.criarFormularioDeUsuario();
  }

  
  criarFormularioDeUsuario() {
    this.formularioDeUsuario = this.fb.group({
      nome: ['', Validators.required],
      //TODO ver se tem máximo de questões
      quantidadeQuestoes: ['', Validators.required],
      tempoSimulado: ['', Validators.required],
      tipoSimulado: ['', Validators.required]
    });
  };

  get f() { return this.formularioDeUsuario.controls; }

  gerarSimulado(){
    this.carregar = true;
    //Salvando o tempo digitado
    let tempo = this.converterMinutosEmSegundos( this.formularioDeUsuario.get('tempoSimulado').value);
    localStorage.setItem('tempo', JSON.stringify(tempo));
    
    this.router.navigateByUrl('/aluno/simuladogerado');
  }

  converterMinutosEmSegundos(minutos: number) {
    return minutos * 60;
  }

}
