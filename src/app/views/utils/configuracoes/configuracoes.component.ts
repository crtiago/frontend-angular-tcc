import { Validacoes } from './../../../_helpers/validacoes';
import { EDisciplina } from './../../../_enuns/edisciplinas';
import { CadastroService } from 'src/app/_servicos/cadastro/cadastro.service';
import { MetodosEnuns } from './../../../_helpers/metodos-enuns';
import { AutenticacaoService } from './../../../_servicos/login/autenticacao.service';
import { first } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from "jquery";

//Varivável para habilitar e usar o jquery
declare var $: any;

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.css']
})
export class ConfiguracoesComponent implements OnInit {

  //Variável que recebe o modal de Alerta Sucesso para poder habilitá-lo
  @ViewChild('modalSucesso') modalSucesso: ElementRef;
  //Variável que recebe o modal de Alerta Sucesso para poder habilitá-lo
  @ViewChild('modalErro') modalErro: ElementRef;
  formularioDeUsuario: FormGroup;
  mensagem = '';
  todasDisciplinas = [];
  disciplinasInteresse = [];
  textoInputImagem = "Atualizar foto de perfil";
  erro = '';
  carregar = false;
  instituicoes: [];
  idIntituicao: number;
  usuario: any;
  imagemUsuario: string;


  constructor(private fb: FormBuilder,
    private autenticacaoService: AutenticacaoService,
    private metodosDisciplinas: MetodosEnuns,
    private cadastroService: CadastroService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) {
    this.usuario = this.autenticacaoService.getUsuario;
    this.imagemUsuario = this.usuario.ImagemUsuario;
    if (this.usuario.TipoUsuario == 2) {
      this.todasDisciplinas = metodosDisciplinas.getValores(EDisciplina);
      this.getDisciplinasInteresseNaoSelecionadas();
    }
  }

  ngOnInit() {
    this.criarFormularioDeUsuario();
    this.instituicoes = this.route.snapshot.data.response.Data;
    this.setValoresCampos();
  }

  getDisciplinasInteresseNaoSelecionadas() {
    for (let index = 0; index < this.usuario.DisciplinasInteressadas.length; index++) {
      this.disciplinasInteresse.push(this.usuario.DisciplinasInteressadas[index].Nome);
      this.todasDisciplinas.splice(this.usuario.DisciplinasInteressadas[index].Nome, 1);
    }
  }

  getDisciplinas(e) {
    const Nome = this.formularioDeUsuario.get('disciplinas').value;
    const Codigo = this.todasDisciplinas.indexOf(Nome);
    this.disciplinasInteresse.push(Nome);
    this.todasDisciplinas.splice(Codigo, 1);
  }

  removerDisciplina(disciplina: string) {
    const index = this.disciplinasInteresse.indexOf(disciplina);
    this.todasDisciplinas.push(disciplina);
    this.disciplinasInteresse.splice(index, 1);
    if (this.disciplinasInteresse.length == 0) {
      this.formularioDeUsuario.get('disciplinas').setValue("");
    }
  }

  setValoresCampos() {
    this.formularioDeUsuario.get('matricula').setValue(this.usuario.Matricula);
    this.formularioDeUsuario.get('anoIngresso').setValue(this.usuario.AnoIngresso);
    this.formularioDeUsuario.get('instituicao').setValue(this.usuario.Instituicao.Id);
    this.formularioDeUsuario.get('disciplinas').setValue("Escolha uma ou mais disciplinas");
    this.formularioDeUsuario.get('cpf').setValue(this.usuario.CPF);
    this.formularioDeUsuario.get('nome').setValue(this.usuario.Nome);
    this.formularioDeUsuario.get('nascimento').setValue(this.convertDate(this.usuario.Nascimento));
    this.formularioDeUsuario.get('email').setValue(this.usuario.Email);
    this.formularioDeUsuario.get('telefone').setValue(this.usuario.Telefone);
  }

  getImagem() {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + this.imagemUsuario);
  }

  convertDate(input) {
    let data = new Date(input);
    let date = ("0" + data.getDate()).slice(-2);
    let month = ("0" + (data.getMonth() + 1)).slice(-2);
    let year = data.getFullYear();
    return (year + "-" + month + "-" + date);
  }

  criarFormularioDeUsuario() {
    this.formularioDeUsuario = this.fb.group({
      instituicao: ['', Validators.required],
      matricula: [{ value: '', disabled: true }, Validators.required],
      anoIngresso: [{ value: '', disabled: true }, Validators.compose([Validators.required, Validators.minLength(4), Validacoes.validarAno])],
      disciplinas: [{ value: '', disabled: true }, Validators.required],
      nome: ['', Validators.required,],
      cpf: ['', Validators.compose([Validators.required, Validacoes.validarCPF])],
      nascimento: ['', [Validacoes.validarAno, Validators.required, Validacoes.maiorQue16Anos, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.minLength(10)],
      imagem: ['']
    });
    this.habilitarCampos();
  };

  habilitarCampos() {
    if (this.usuario.TipoUsuario == 1) {

      //Se o TipoUsuário for Aluno ele habilita os seus inputs
      this.formularioDeUsuario.get('matricula').enable();
      this.formularioDeUsuario.get('anoIngresso').enable();

      //Se o TipoUsuário for Aluno ele desabilita os inputs do professor
      this.formularioDeUsuario.get('disciplinas').disable();

      //Reseta os campos do professor
      this.formularioDeUsuario.get('disciplinas').reset();
      this.disciplinasInteresse = [];
      this.todasDisciplinas = this.metodosDisciplinas.getValores(EDisciplina);
    } else {

      //Se o TipoUsuário for Professor ele desabilita os inputs do Aluno
      this.formularioDeUsuario.get('matricula').disable();
      this.formularioDeUsuario.get('anoIngresso').disable();

      //Se o TipoUsuário for Professor ele habilita os seus inputs
      this.formularioDeUsuario.get('disciplinas').enable();
    }
  }

  converteImagem64Dinamicamente(event) {
    this.textoInputImagem = "Imagem selecionada";
    const files = event.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imagemUsuario = <string>reader.result.toString().split(',')[1];
    }
  }

  /**
    * Método get do formulário para obter os erros
    */
  get f() { return this.formularioDeUsuario.controls; }

  alterar() {
    this.carregar = true;
    this.idIntituicao = this.convertStringParaNumero(this.formularioDeUsuario.get('instituicao').value);

    console.log(this.idIntituicao);

    if (this.usuario.TipoUsuario == 1) {
      this.cadastroService.alterarAluno(
        this.usuario.IdUsuario,
        this.formularioDeUsuario.get('cpf').value,
        this.formularioDeUsuario.get('email').value,
        this.idIntituicao,
        this.formularioDeUsuario.get('nascimento').value,
        this.formularioDeUsuario.get('nome').value,
        this.formularioDeUsuario.get('telefone').value,
        this.usuario.TipoUsuario,
        this.imagemUsuario,
        this.formularioDeUsuario.get('matricula').value,
        this.formularioDeUsuario.get('anoIngresso').value
      ).pipe(first()).subscribe(
        data => {
          this.carregar = false;
          this.mensagem = data.Mensagem;
          localStorage.setItem('usuario', JSON.stringify(data.Data));
          $(this.modalSucesso.nativeElement).modal('show');
        },
        error => {
          this.carregar = false;
          //Remove a o texto 'Error:' e adiciona a mensagem a variável erro
          this.erro = error.toString().replace("Error:", "");
          $(this.modalErro.nativeElement).modal('show');
        });
    } else {
      this.cadastroService.alterarProfessor(
        this.usuario.IdUsuario,
        this.formularioDeUsuario.get('cpf').value,
        this.formularioDeUsuario.get('email').value,
        this.idIntituicao,
        this.formularioDeUsuario.get('nascimento').value,
        this.formularioDeUsuario.get('nome').value,
        this.formularioDeUsuario.get('telefone').value,
        this.usuario.TipoUsuario,
        this.imagemUsuario,
        this.disciplinasInteresse
      ).pipe(first()).subscribe(
        data => {
          this.carregar = false;
          this.mensagem = data.Mensagem;
          localStorage.setItem('usuario', JSON.stringify(data.Data));
          $(this.modalSucesso.nativeElement).modal('show');
        },
        error => {
          this.carregar = false;
          console.log(error);
          //Remove a o texto 'Error:' e adiciona a mensagem a variável erro
          this.erro = error.toString().replace("Error:", "");
          $(this.modalErro.nativeElement).modal('show');
        });

    }
  }

  atualizarPagina() {
    location.reload();
  }

  getIdInstituicao(event: any) {
    this.idIntituicao = this.convertStringParaNumero(event.target.value);
  }

  convertStringParaNumero(valor: string) {
    return Number(valor);
  }

}
