import { AutenticacaoService } from './../../../_servicos/login/autenticacao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prof-home',
  templateUrl: './prof-home.component.html',
  styleUrls: ['./prof-home.component.css']
})
export class ProfHomeComponent implements OnInit {

  constructor(private autenticacaoService: AutenticacaoService) { }

  ngOnInit(): void {
  }
  sair() {
    this.autenticacaoService.logout();
  }

}
