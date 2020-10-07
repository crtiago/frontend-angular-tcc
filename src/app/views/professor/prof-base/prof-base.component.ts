import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AutenticacaoService } from './../../../_servicos/login/autenticacao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prof-base',
  templateUrl: './prof-base.component.html',
  styleUrls: ['./prof-base.component.css']
})
export class ProfBaseComponent implements OnInit {

  listaTitulosNavbar = ['Dashboard', 'Gerenciar Salas', 'Configurações', 'Suporte'];
  idTitulo:any;
  aberta: boolean = false;
  usuario: any;
  base64Image: string;

  constructor(private autenticacaoService: AutenticacaoService, private sanitizer: DomSanitizer, private route: ActivatedRoute) {
    this.usuario = autenticacaoService.getUsuario;
    this.base64Image = this.usuario.ImagemUsuario;    
    this.idTitulo = localStorage.getItem('idTituloProf');
  }
 
  getImagem() {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + this.base64Image);
  }

  ngOnInit() {
  }


  botaoSidebar(id:number) {
    this.idTitulo = id;
    localStorage.setItem('idTituloProf', JSON.stringify(this.idTitulo));
    this.aberta = !this.aberta;
  }

  logout() {
    this.autenticacaoService.logout();
  }

}
