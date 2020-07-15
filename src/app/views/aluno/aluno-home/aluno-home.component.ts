import { AutenticacaoService } from './../../../_servicos/login/autenticacao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aluno-home',
  templateUrl: './aluno-home.component.html',
  styleUrls: ['./aluno-home.component.css']
})
export class AlunoHomeComponent implements OnInit {

  constructor(private autenticacaoService: AutenticacaoService) { }

  ngOnInit(): void {
  }

  logout() {
    this.autenticacaoService.logout();
  }

}
