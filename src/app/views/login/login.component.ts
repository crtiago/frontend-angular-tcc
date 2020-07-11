import { Funcao } from './../../_enuns/funcao';
import { AutenticacaoServiceService } from './../../_servicos/login/autenticacao-service.service';
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
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  clicado = false;
  url: string;
  erro = '';

  constructor(
    @Inject(DOCUMENT) private _document,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private autenticacaoService: AutenticacaoServiceService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      cpf: ['', Validators.required],
      senha: ['', Validators.required]
    });


    //Adiciona a tag do corpo do formulário de classe, para alterar o background-color
    this._document.body.classList.add('bodybg-color');
  }

  get f() { return this.loginForm.controls; }

  enviar() {
    this.clicado = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.autenticacaoService.login(this.f.cpf.value, this.f.senha.value)
      .pipe(first()).subscribe(
        data => {
          if (data == undefined) {
            console.log("Não autorizado");
          } else if (data.TipoUsuario == Funcao.Aluno) {
            this.router.navigate(['homealuno']);
            this.sair();
          } else if (data.TipoUsuario == Funcao.Professor) {
            this.router.navigate(['homeprofessor']);
            this.sair();
          }
        },
        error => {
          this.erro = error;
        });
  }

  sair() {
    this.autenticacaoService.logout();
    console.log("Deslogado")
  }


  ngOnDestroy() {
    //Remove a tag do corpo do formulário de classe 
    this._document.body.classList.add('bodybg-color');
  }

}
