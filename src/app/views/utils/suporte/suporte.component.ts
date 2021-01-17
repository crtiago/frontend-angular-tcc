import { first } from 'rxjs/operators';
import { CadastroService } from './../../../_servicos/cadastro/cadastro.service';
import { EFuncao } from './../../../_enuns/efuncao';
import { AutenticacaoService } from './../../../_servicos/login/autenticacao.service';
import { EAssuntoSuporte } from './../../../_enuns/eassuntosuporte';
import { MetodosEnuns } from './../../../_helpers/metodos-enuns';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-suporte',
  templateUrl: './suporte.component.html',
  styleUrls: ['./suporte.component.css']
})
export class SuporteComponent implements OnInit {
  formularioDeUsuario: FormGroup;
  assuntos = [];
  assunto = null;
  usuario: any;
  carregar = false;

  constructor(private toastr: ToastrService, private cadastroService: CadastroService, private autenticacaoService: AutenticacaoService, private fb: FormBuilder, private route: ActivatedRoute, private metodosEnuns: MetodosEnuns,) {
    this.usuario = autenticacaoService.getUsuario;
  }

  ngOnInit() {
    this.criarFormularioDeUsuario();
    this.assuntos = this.metodosEnuns.getValores(EAssuntoSuporte);
  }

  criarFormularioDeUsuario() {
    this.formularioDeUsuario = this.fb.group({
      assunto: ['', Validators.required],
      outroAssunto: [{ value: '', disabled: true }, Validators.required],
      descricao: ['', [Validators.required, Validators.minLength(20)]],
    });
  }


  /**
   * Método get do formulário para obter os erros
   */
  get f() { return this.formularioDeUsuario.controls; }

  getAssunto(event: any) {
    this.assunto = event.target.value;
    if (this.assunto == 'Outro') {
      this.formularioDeUsuario.get('outroAssunto').reset();
      this.formularioDeUsuario.get('outroAssunto').enable();
    } else {
      this.formularioDeUsuario.get('outroAssunto').reset();
      this.formularioDeUsuario.get('outroAssunto').disable();
    }
  }

  enviarEmail() {
    this.carregar = true;
    let assunto;
    let descricao;
    let cabecalho;

    if (this.formularioDeUsuario.get('assunto').value == 'Outro') {
      assunto = this.formularioDeUsuario.get('outroAssunto').value;
    } else {
      assunto = this.formularioDeUsuario.get('assunto').value;
    }
    descricao = this.formularioDeUsuario.get('descricao').value;
    cabecalho = 'Nome: '.concat(this.usuario.Nome)
    cabecalho = cabecalho.concat('\nEmail: ' + this.usuario.Email);
    cabecalho = cabecalho.concat('\nInstituição: ' + this.usuario.Instituicao.Nome);
    cabecalho = cabecalho.concat('\nTipo de Usuário: ' + EFuncao[this.usuario.TipoUsuario]);

    if (this.usuario.Telefone != null && this.usuario.Telefone != "") {
      cabecalho = cabecalho.concat('\nTelefone: ' + this.usuario.Telefone);
    }

    cabecalho = cabecalho.concat('\nAssunto: ' + assunto);

    descricao = cabecalho.concat('\nDescrição: \n \n' + descricao);

    this.cadastroService.enviarEmail(assunto, descricao)
      .pipe(first()).subscribe(
        data => {

          this.carregar = false;
          this.toastr.success('Informações enviadas com sucesso.', '', {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'decreasing',
          });
          this.formularioDeUsuario.get('outroAssunto').reset();
          this.formularioDeUsuario.get('descricao').reset();
        },
        error => {
          this.toastr.error('Ocorreu erro ao enviar as informações, tente novamente mais tarde.', '', {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'decreasing',
          });
          this.carregar = false;
          this.formularioDeUsuario.get('outroAssunto').reset();
          this.formularioDeUsuario.get('descricao').reset();
        });
  }

}
