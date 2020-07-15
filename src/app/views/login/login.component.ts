import { Validacoes } from './../../_helpers/validacoes';
import { AutenticacaoService } from '../../_servicos/login/autenticacao.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})

/**
 * Componente de Login, responsável por fazer a validação dos campos e verificar se o usuário está
 * logado ou não, caso o usuário esteja logado ele direciona para a página home do mesmo
 */
export class LoginComponent implements OnInit, OnDestroy {

  // Aqui damos um nome para nosso formulário
  // E ele precisa ser do tipo FormGroup
  formularioDeUsuario: FormGroup;
  habilita = true;
  erro = '';

  constructor(
    @Inject(DOCUMENT) private _document,
    private fb: FormBuilder,
    private router: Router,
    private autenticacaoService: AutenticacaoService) {

    if (this.autenticacaoService.getUsuario) {
      if (this.autenticacaoService.getUsuario.TipoUsuario == 1) {
        this.router.navigate(['aluno']);
      } else {
        this.router.navigate(['prof']);
      }
    }
  }


  ngOnInit() {
    this.criarFormularioDeUsuario();
    this._document.body.classList.add('bodybg-background');
  }

  criarFormularioDeUsuario() {
    this.formularioDeUsuario = this.fb.group({
      cpf: ['', Validators.compose([Validators.required, Validacoes.validarCPF])],
      //TODO Desabilitar o campo senha enquanto n digitar um cpf válido
      senha: [{ value: '', disabled: false }, Validators.compose([Validators.required])],
    });
  }

  get cpf() {
    return this.formularioDeUsuario.get('cpf');
  }

  get senha() {
    return this.formularioDeUsuario.get('senha');
  }

  enviar() {
    this.autenticacaoService.login(this.formularioDeUsuario.value.cpf, this.formularioDeUsuario.value.senha)
      .pipe(first()).subscribe(
        data => {
          if (data.TipoUsuario == 1) {
            this.router.navigate(['aluno']);
          } else if (data.TipoUsuario == 2) {
            this.router.navigate(['prof']);
          } else {
            this.router.navigate(['login']);
          }
        },
        error => {
          this.erro = error;
        });
  }

  sair() {
    this.autenticacaoService.logout();
  }

  ngOnDestroy() {
    //Remove a tag do corpo do formulário de classe, deixando sem a imagem do ifsc de fundo
    this._document.body.classList.remove('bodybg-background');
  }

}
