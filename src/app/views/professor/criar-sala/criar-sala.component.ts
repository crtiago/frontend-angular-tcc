import { SalasService } from './../../../_servicos/salas/salas.service';
import { Validacoes } from './../../../_helpers/validacoes';
import { AutenticacaoService } from './../../../_servicos/login/autenticacao.service';
import { SimuladoService } from './../../../_servicos/simulados/simulado.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-criar-sala',
  templateUrl: './criar-sala.component.html',
  styleUrls: ['./criar-sala.component.css']
})
export class CriarSalaComponent implements OnInit {


  carregar = false;
  formularioDeUsuario: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private salasService: SalasService) { }

  ngOnInit(): void {
    this.criarFormularioDeUsuario();
  }

  criarFormularioDeUsuario() {
    this.formularioDeUsuario = this.fb.group({
      nome: ['', Validators.required],
      descricao: [''],
      maxParticipantes: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required],
    }, {
      validators:
        [Validacoes.validarQuantidadeParticipantesSala('maxParticipantes'),
        Validacoes.conferem('senha', 'confirmarSenha')]
    }
    );
  };

  get f() { return this.formularioDeUsuario.controls; }

  criarSala() {
    this.carregar = true;
    this.salasService.criarSala(
      this.formularioDeUsuario.get('descricao').value,
      this.formularioDeUsuario.get('maxParticipantes').value,
      this.formularioDeUsuario.get('nome').value,
      this.formularioDeUsuario.get('senha').value,
    ).pipe(first()).subscribe(
      resposta => {
        this.router.navigateByUrl('/prof/salas');
      },
      error => {
        console.log(error);
        this.carregar = false;
      });

  }
}
