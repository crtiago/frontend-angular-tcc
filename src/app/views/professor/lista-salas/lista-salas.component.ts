import { SalasService } from './../../../_servicos/salas/salas.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-salas',
  templateUrl: './lista-salas.component.html',
  styleUrls: ['./lista-salas.component.css']
})
export class ListaSalasComponent implements OnInit {

  listaSalas = [];
  linhaSelecionada: number;
  selecionado: boolean = false;
  idSalaSelecionada: number;
  carregar: boolean = false;
  nenhumaSala: boolean = false;

  constructor(private route: ActivatedRoute, private toastr: ToastrService, private router: Router, private salasService: SalasService) {
    this.listaSalas = this.route.snapshot.data.response.Data;
    if (this.listaSalas.length == 0) {
      this.nenhumaSala = true;
    }
  }

  ngOnInit(): void {
  }

  salaSelecionada(event: any, item: any, index: any) {
    this.linhaSelecionada = index;
    this.selecionado = true;
    this.idSalaSelecionada = item.Id;
  }

  entrarSala() {
    this.carregar = true;
    this.salasService.buscarSimuladosPorSala(this.idSalaSelecionada).pipe(first()).subscribe(
      resposta => {
        this.carregar = false;
        this.router.navigate(['prof/listasimuladossala']);
        sessionStorage.setItem('simuladosSalaProfessor', JSON.stringify(resposta.Data));
        sessionStorage.setItem('idSala', JSON.stringify(this.idSalaSelecionada));
        this.toastr.success('Lista de simulados da sala', '', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
      },
      error => {
        this.carregar = false;
        error = error.toString().replace("Error:", "");
        this.toastr.error(error, '', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
      });
  }


}
