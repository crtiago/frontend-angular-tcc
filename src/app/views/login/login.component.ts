import { AutenticacaoService } from './../../_servicos/login/autenticacao.service';
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
/*Verificado*/
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(@Inject(DOCUMENT) private _document, private formBuilder: FormBuilder,
    private rota: ActivatedRoute,
    private routeador: Router,
    private autenticacaoService: AutenticacaoService
  ) {
    if (this.autenticacaoService.valorUsuarioAtual.tipoUsuario == 1) {
      this.routeador.navigate(['/homealuno']);
    } else {
      this.routeador.navigate(['/homeprofessor']);
    }
  }

  ngOnInit() {
    //Adiciona a tag do corpo do formulário de classe, para alterar o background-color
    this._document.body.classList.add('bodybg-color');

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });

  // get return url from route parameters or default to '/'
  this.returnUrl = this.rota.snapshot.queryParams['returnUrl'] || '/login';
  }

  get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.submitted = true;
        this.autenticacaoService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                  
                    this.routeador.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }

  ngOnDestroy() {
    //Remove a tag do corpo do formulário de classe 
    this._document.body.classList.add('bodybg-color');
  }

}
