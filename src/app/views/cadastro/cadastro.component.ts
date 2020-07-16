import { AutenticacaoService } from './../../_servicos/login/autenticacao.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit, OnDestroy {

  constructor(
    @Inject(DOCUMENT) private _document,
    private autenticacaoService: AutenticacaoService
  ) {

    /**
     * Antes de construir verifica se há algum usuário logado, caso haja, direciona pra home do mesmo
     */
    autenticacaoService.logado();
  }

  ngOnInit() {
    this._document.body.classList.add('bodybg-background');
  }

  ngOnDestroy() {
    //Remove a tag do corpo do formulário de classe, deixando sem a imagem do ifsc de fundo
    this._document.body.classList.remove('bodybg-background');
  }

}
