import { AutenticacaoService } from '../../../_servicos/login/autenticacao.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-aluno-base',
  templateUrl: './aluno-base.component.html',
  styleUrls: ['./aluno-base.component.css']
})
export class AlunoBaseComponent implements OnInit {

  
  opened: boolean = false;
  usuario: any;
  base64Image: string;

  constructor(private autenticacaoService: AutenticacaoService, private sanitizer: DomSanitizer) {
    this.usuario = autenticacaoService.getUsuario;
    this.base64Image = this.usuario.ImagemUsuario;
  }

  getImagem() {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + this.base64Image);
  }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.opened = !this.opened;
  }

  logout() {
    this.autenticacaoService.logout();
  }




}
