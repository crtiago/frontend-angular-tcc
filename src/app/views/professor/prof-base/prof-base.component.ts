import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { AutenticacaoService } from './../../../_servicos/login/autenticacao.service';
import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-prof-base',
  templateUrl: './prof-base.component.html',
  styleUrls: ['./prof-base.component.css']
})
export class ProfBaseComponent implements OnInit {

  aberta: boolean = false;
  usuario: any;
  base64Image: string;
  spinnerCarregamento: boolean = false;
  tituloNavbar: string;

  constructor(private autenticacaoService: AutenticacaoService, private sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute,) {
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
      if (event instanceof NavigationStart) {
        /*Devido a tela de configurações demorar mais, é setado o titulo até ela ser carregada, 
        para não ficar com o título da página anterior*/
        if (event.url == "/prof/configuracoes") {
          this.tituloNavbar = "Configurações"
        }
        this.spinnerCarregamento = true;
      }

      if (event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError) {
        this.spinnerCarregamento = false;
      }
    });
  }

}
