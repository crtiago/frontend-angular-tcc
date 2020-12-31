import { first } from 'rxjs/operators';
import { AutenticacaoService } from './../../../_servicos/login/autenticacao.service';
import { SimuladoService } from './../../../_servicos/simulados/simulado.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-simulado-concluido',
  templateUrl: './simulado-concluido.component.html',
  styleUrls: ['./simulado-concluido.component.css']
})
export class SimuladoConcluidoComponent implements OnInit, OnDestroy {

  idSimuladoGabarito: number;
  carregarGabarito: boolean = false;
  desabilitar = false;

  constructor(private toastr: ToastrService, private simuladoService: SimuladoService, private router: Router, private autenticacaoService: AutenticacaoService) {
    if (Number(sessionStorage.getItem('idSimuladoGabarito')) == 0 || sessionStorage.getItem('idSimuladoGabarito') == null) {
      this.desabilitar = true;
      this.router.navigate(['aluno/listasimulados']);
    } else {
      this.idSimuladoGabarito = Number(sessionStorage.getItem('idSimuladoGabarito'));
    }
  }

  ngOnDestroy(): void {
    sessionStorage.setItem('idSimuladoGabarito', JSON.stringify(0));
  }

  ngOnInit(): void {
  }

  buscarGabarito() {
    this.carregarGabarito = true;
    this.simuladoService.buscarGabarito(this.idSimuladoGabarito, this.autenticacaoService.getUsuario.IdUsuario).pipe(first()).subscribe(
      gabarito => {
        sessionStorage.setItem('gabarito', JSON.stringify(gabarito));
        this.router.navigateByUrl("/aluno/gabarito");
        this.toastr.success('Gabarito gerado', '', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
      },
      error => {
        this.carregarGabarito = false;
        this.toastr.error(error, '', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
      });
  }

}
