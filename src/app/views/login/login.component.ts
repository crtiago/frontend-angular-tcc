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
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  clicado = false;
  erro = '';

  constructor(
    @Inject(DOCUMENT) private _document,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private autenticacaoService: AutenticacaoService) {

    if (!this.autenticacaoService.userValue) {
      this.router.navigate(['/login']);
    }
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
          console.log(this.autenticacaoService.redirectUrl);
          this.router.navigateByUrl(this.autenticacaoService.redirectUrl);
        },
        error => {
          this.erro = error;
        });
  }

  sair() {
    this.autenticacaoService.logout();
  }


  ngOnDestroy() {
    //Remove a tag do corpo do formulário de classe 
    this._document.body.classList.add('bodybg-color');
  }

}
