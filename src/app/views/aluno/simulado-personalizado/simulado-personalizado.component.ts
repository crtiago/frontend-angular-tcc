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
      nome: ['Simulado Personalizado', Validators.required],
      //TODO ver se tem máximo de questões
      quantidadeQuestoes: ['10', Validators.required],
      tempoSimulado: ['10', Validators.required],
      tipoSimulado: ['', Validators.required]
    });
  };

  get f() { return this.formularioDeUsuario.controls; }

  gerarSimulado(){
    this.carregar = true;
    this.router.navigateByUrl('/aluno/simuladogerado');
  }

}
