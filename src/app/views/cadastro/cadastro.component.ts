import { DataReponse } from './../../_modelos/data-response';
import { first } from 'rxjs/operators';
import { CadastroService } from './../../_servicos/cadastro/cadastro.service';
import { TratamentoImagem } from '../../_helpers/tratamento-imagem';
import { MetodosEnuns } from './../../_helpers/metodos-enuns';
import { Validacoes } from './../../_helpers/validacoes';
import { AutenticacaoService } from './../../_servicos/login/autenticacao.service';
import { Component, OnInit, Inject, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from "jquery";
import { ActivatedRoute } from '@angular/router';

//Varivável para habilitar e usar o jquery
declare var $: any;

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})

/**
 * Componente de Cadastro, responsável por fazer o cadastro do usuário no sistema
 */
export class CadastroComponent implements OnInit, OnDestroy {

  //Variável que recebe o modal de Alerta Sucesso para poder habilitá-lo
  @ViewChild('modalSucesso') modalSucesso: ElementRef;
  //Variável que recebe o modal de Alerta Sucesso para poder habilitá-lo
  @ViewChild('modalErro') modalErro: ElementRef;
  formularioDeUsuario: FormGroup;
  mensagem = '';
  todasDisciplinas = [];
  disciplinasInteresse = [];
  textoInputImagem = "Selecione uma imagem";
  erro = '';
  imagem: any;
  carregar = false;
  intituicoes: DataReponse;
  idIntituicao: number;

  constructor(private fb: FormBuilder,
    @Inject(DOCUMENT) private _document,
    private autenticacaoService: AutenticacaoService,
    private metodosDisciplinas: MetodosEnuns,
    private tratamentoImagem: TratamentoImagem,
    private cadastroService: CadastroService,
    private route: ActivatedRoute
  ) {

    //Antes de construir verifica se há algum usuário logado, caso haja, direciona pra home do mesmo
    this.autenticacaoService.logado();

    //Pega todos os valores das disciplinas 
    this.todasDisciplinas = metodosDisciplinas.getValores();
  }

  ngOnInit() {
    this.criarFormularioDeUsuario();
    this._document.body.classList.add('bodybg-background');
    this.intituicoes = this.route.snapshot.data.response.Data;
  }

  criarFormularioDeUsuario() {
    this.formularioDeUsuario = this.fb.group({
      tipoUsuario: ['', Validators.required],
      instituicao: ['', Validators.required],
      matricula: [{ value: '', disabled: true }, Validators.required],
      anoIngresso: [{ value: '', disabled: true }, Validators.compose([Validators.required, Validators.minLength(4), Validacoes.validarAno])],
      disciplinas: [{ value: '', disabled: true }, Validators.required],
      nome: ['', Validators.required,],
      cpf: ['', Validators.compose([Validators.required, Validacoes.validarCPF])],
      nascimento: ['', [Validacoes.validarAno, Validators.required, Validacoes.maiorQue16Anos, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.minLength(10)],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required],
    }, {
      validator: Validacoes.conferem('senha', 'confirmarSenha')
    });
  };

  getTipo(e) {
    if (this.formularioDeUsuario.get('tipoUsuario').value == 1) {

      //Se o TipoUsuário for Aluno ele habilita os seus inputs
      this.formularioDeUsuario.get('matricula').enable();
      this.formularioDeUsuario.get('anoIngresso').enable();

      //Se o TipoUsuário for Aluno ele desabilita os inputs do professor
      this.formularioDeUsuario.get('disciplinas').disable();

      //Reseta os campos do professor
      this.formularioDeUsuario.get('disciplinas').reset();
      this.disciplinasInteresse = [];
      this.todasDisciplinas = this.metodosDisciplinas.getValores();
    } else {

      //Se o TipoUsuário for Professor ele desabilita os inputs do Aluno
      this.formularioDeUsuario.get('matricula').reset();
      this.formularioDeUsuario.get('anoIngresso').reset();
      this.formularioDeUsuario.get('matricula').disable();
      this.formularioDeUsuario.get('anoIngresso').disable();

      //Se o TipoUsuário for Professor ele habilita os seus inputs
      this.formularioDeUsuario.get('disciplinas').enable();
    }
  }

  getDisciplinas(e) {
    const disciplina = this.formularioDeUsuario.get('disciplinas').value;
    const index = this.todasDisciplinas.indexOf(disciplina);
    this.disciplinasInteresse.push(disciplina);
    this.todasDisciplinas.splice(index, 1);
  }

  removerDisciplina(disciplina: string) {
    const index = this.disciplinasInteresse.indexOf(disciplina);
    this.todasDisciplinas.push(disciplina);
    this.disciplinasInteresse.splice(index, 1);
  }

  converteImagem64(event) {
    this.textoInputImagem = "Imagem Selecionada";
    this.tratamentoImagem.getFiles(event);
  }

  /**
    * Método get do formulário para obter os erros
    */
  get f() { return this.formularioDeUsuario.controls; }

  cadastrar(model: any) {

   this.carregar = true;

    this.imagem = this.tratamentoImagem.imagemString;

    if (this.formularioDeUsuario.get('tipoUsuario').value == 1) {
      this.cadastroService.cadastroAluno(
        this.formularioDeUsuario.get('cpf').value,
        this.formularioDeUsuario.get('email').value,
        this.idIntituicao,
        this.formularioDeUsuario.get('nascimento').value,
        this.formularioDeUsuario.get('nome').value,
        this.formularioDeUsuario.get('senha').value,
        this.formularioDeUsuario.get('telefone').value,
        this.formularioDeUsuario.get('tipoUsuario').value,
        this.imagem,
        this.formularioDeUsuario.get('matricula').value,
        this.formularioDeUsuario.get('anoIngresso').value
      ).pipe(first()).subscribe(
        data => {
          this.carregar = false;
          this.mensagem = data.Mensagem;
          $(this.modalSucesso.nativeElement).modal('show');
        },
        error => {
          this.carregar = false;
          //Remove a o texto 'Error:' e adiciona a mensagem a variável erro
          this.erro = error.toString().replace("Error:", "");
          $(this.modalErro.nativeElement).modal('show');
        });
    } else {

      if (this.disciplinasInteresse.length == 0) {
        this.carregar = false;
        this.erro = "Escolha uma ou mais disciplina de Interesse"
        $(this.modalErro.nativeElement).modal('show');
      } else {

        this.cadastroService.cadastroProfessor(
          this.formularioDeUsuario.get('cpf').value,
          this.formularioDeUsuario.get('email').value,
          this.idIntituicao,
          this.formularioDeUsuario.get('nascimento').value,
          this.formularioDeUsuario.get('nome').value,
          this.formularioDeUsuario.get('senha').value,
          this.formularioDeUsuario.get('telefone').value,
          this.formularioDeUsuario.get('tipoUsuario').value,
          this.imagem,
          this.disciplinasInteresse
        ).pipe(first()).subscribe(
          data => {
            this.carregar = false;
            this.mensagem = data.Mensagem;
            $(this.modalSucesso.nativeElement).modal('show');
          },
          error => {
            this.carregar = false;
            //Remove a o texto 'Error:' e adiciona a mensagem a variável erro
            this.erro = error.toString().replace("Error:", "");
            $(this.modalErro.nativeElement).modal('show');
          });
      }
    }
  }

  getIdInstituicao(event: any) {
    this.idIntituicao = this.convertStringParaNumero(event.target.value);
  }

  ngOnDestroy() {
    //Remove a tag do corpo do formulário de classe, deixando sem a imagem do ifsc de fundo
    this._document.body.classList.remove('bodybg-background');
  }

  convertStringParaNumero(valor: string) {
    return Number(valor) + 1;
  }

}
