import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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

  constructor(private route: ActivatedRoute) {
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
  }


}
