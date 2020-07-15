import { Funcao } from './../../_enuns/funcao';
import { AutenticacaoService } from '../../_servicos/login/autenticacao.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
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
  loginForm: FormGroup;
  clique = false;
  erro = '';

  constructor(
    @Inject(DOCUMENT) private _document,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
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
    this.loginForm = this.formBuilder.group({
      cpf: ['', Validators.required],
      senha: ['', Validators.required]
    });
    //Adiciona a tag do corpo do formulário de classe, colocando a imagem de fundo do ifsc
    this._document.body.classList.add('bodybg-background');
  }

  get f() { return this.loginForm.controls; }

  enviar() {
    this.clique = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.autenticacaoService.login(this.f.cpf.value, this.f.senha.value)
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
