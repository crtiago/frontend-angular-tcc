import { AutenticacaoService } from '../../../_servicos/login/autenticacao.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-aluno-base',
  templateUrl: './aluno-base.component.html',
  styleUrls: ['./aluno-base.component.css']
})
export class AlunoBaseComponent implements OnInit {

  aberta: boolean = false;
  usuario: any;
  base64Image: string;
  spinnerCarregamento: boolean = false;
  tituloNavbar: string;

  constructor(private autenticacaoService: AutenticacaoService, private sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute) {
    this.usuario = autenticacaoService.getUsuario;
    this.base64Image = this.usuario.ImagemUsuario;

    /*Método que pega o título da Navbar, os titulos estão localizado em aluno-routing.module.ts*/
    this.getTituloNavbar();

    /*Método que cria a tela de Loading até os dados serem trazidos do backend*/
    this.loadingParaAguardarDadosDoBackend();
  }

  getImagem() {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + this.base64Image);
  }

  ngOnInit() {
  }

  botaoSidebar() {
    this.aberta = !this.aberta;
  }

  logout() {
    this.autenticacaoService.logout();
  }

  getTituloNavbar() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.route.firstChild;
        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
          } else if (child.snapshot.data && child.snapshot.data['title']) {
            return child.snapshot.data['title'];
          } else {
            return null;
          }
        }
        return null;
      })
    ).subscribe((data: any) => {
      this.tituloNavbar = data;
    });
  }

  loadingParaAguardarDadosDoBackend() {
    this.router.events.subscribe((event) => {
      if (this.tituloNavbar == "Simulado Gerado") {
        this.spinnerCarregamento = false;
      }

      if (event instanceof NavigationStart) {
        this.spinnerCarregamento = true;
      }

      if (event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError) {
        this.spinnerCarregamento = false;
      }
    });
  }

  bloquearBotaoNavbar() {
    return this.tituloNavbar == "Simulado Gerado" ? true : false;
  }

}
