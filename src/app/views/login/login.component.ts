import { Validacoes } from './../../_helpers/validacoes';
import { AutenticacaoService } from '../../_servicos/login/autenticacao.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
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
  formularioDeUsuario: FormGroup;
  carregar = false;
  erro = '';

  constructor(
    @Inject(DOCUMENT) private _document,
    private fb: FormBuilder,
    private router: Router,
    private autenticacaoService: AutenticacaoService) {

    /**
      * Antes de construir verifica se há algum usuário logado, caso haja, direciona pra home do mesmo
      */
    autenticacaoService.logado();
  }

  ngOnInit() {
    this.criarFormularioDeUsuario();
    this._document.body.classList.add('bodybg-background');
  }

  /**
   * Método responsável por validar os campos cpf e senha
   */
  criarFormularioDeUsuario() {
    this.formularioDeUsuario = this.fb.group({
      cpf: ['', Validators.compose([Validators.required, Validacoes.validarCPF])],
      //TODO Desabilitar o campo senha enquanto n digitar um cpf válido
      senha: [{ value: '', disabled: false }, Validators.compose([Validators.required])],
    });
  }


  /**
   * Métodos get do formulário para obter os erros
   */
  get cpf() {
    return this.formularioDeUsuario.get('cpf');
  }

  get senha() {
    return this.formularioDeUsuario.get('senha');
  }


  /**
   * Método que faz o login no sistema e direciona a rota especifica conforme o tipo de usuário
   */
  login() {
    this.carregar = true;
    this.autenticacaoService.login(this.formularioDeUsuario.value.cpf, this.formularioDeUsuario.value.senha)
      .pipe(first()).subscribe(
        data => {
          if (data.TipoUsuario == 1) {
            this.router.navigate(['aluno']);
          } else if (data.TipoUsuario == 2) {
            this.router.navigate(['prof']);
          }
        },
        error => {
          //Remove a o texto 'Error:' e adiciona a mensagem a variável erro
          this.erro = error.toString().replace("Error:","");
          //Caso retorne erro ele desativa o circulo de carregamento
          this.carregar = false;
        });
  }

  ngOnDestroy() {
    //Remove a tag do corpo do formulário de classe, deixando sem a imagem do ifsc de fundo
    this._document.body.classList.remove('bodybg-background');
  }

}
