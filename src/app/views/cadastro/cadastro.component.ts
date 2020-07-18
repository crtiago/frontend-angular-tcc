import { Validacoes } from './../../_helpers/validacoes';
import { AutenticacaoService } from './../../_servicos/login/autenticacao.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit, OnDestroy {
  formularioDeUsuario: FormGroup;
  submitted = false;
  tipoUsuario: number;

  constructor(private fb: FormBuilder,
    @Inject(DOCUMENT) private _document,
    private autenticacaoService: AutenticacaoService
  ) {

    /**
     * Antes de construir verifica se há algum usuário logado, caso haja, direciona pra home do mesmo
     */
    this.autenticacaoService.logado();
  }

  ngOnInit() {
    this.criarFormularioDeUsuario();
    this._document.body.classList.add('bodybg-background');
  }

  criarFormularioDeUsuario(){
    this.formularioDeUsuario = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.compose([Validators.required, Validacoes.validarCPF])],
      // validates date format yyyy-mm-dd
      nascimento: ['', [Validators.required, Validacoes.maiorQue16Anos,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['',Validators.minLength(10)],
      instituicao: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required],
      tipoUsuario:['', Validators.required],
      matricula:[{value:'', disabled: this.validar()},Validators.required],
      anoIngresso:['', Validators.compose([Validators.required, Validators.minLength(4), Validacoes.validarAno])],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validator: Validacoes.conferem('senha', 'confirmarSenha')
    });
  };
  
validar(){
  if(this.tipoUsuario == 1){
    return true;
  }
}

 /**
   * Método get do formulário para obter os erros
   */
  get f() { return this.formularioDeUsuario.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formularioDeUsuario.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.formularioDeUsuario.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.formularioDeUsuario.reset();
  }

  ngOnDestroy() {
    //Remove a tag do corpo do formulário de classe, deixando sem a imagem do ifsc de fundo
    this._document.body.classList.remove('bodybg-background');
  }

}
