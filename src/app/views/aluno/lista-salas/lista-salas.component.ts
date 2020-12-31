import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { SalasService } from './../../../_servicos/salas/salas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as $ from "jquery";
import { ToastrService } from 'ngx-toastr';


//Varivável para habilitar e usar o jquery
declare var $: any;

@Component({
  selector: 'app-sala',
  templateUrl: './lista-salas.component.html',
  styleUrls: ['./lista-salas.component.css']
})
export class ListaSalasComponent implements OnInit {

  @ViewChild('modalSenha') modalSenha: ElementRef;
  listaSalas = [];
  linhaSelecionada: number;
  selecionado: boolean = false;
  idSalaSelecionada: number;
  carregar: boolean = false;
  nenhumaSala: boolean = false;
  formularioDeUsuario: FormGroup;
  participar: boolean = false;
  erro = '';

  constructor(private toastr: ToastrService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private salasService: SalasService) {
    this.listaSalas = this.route.snapshot.data.response.Data;
    if (this.listaSalas.length == 0) {
      this.nenhumaSala = true;
    }
  }

  ngOnInit(): void {
    this.criarFormularioDeUsuario();
  }

  criarFormularioDeUsuario() {
    this.formularioDeUsuario = this.fb.group({
      senha: ['', [Validators.required, Validators.minLength(6)]]
    }
    );
  };

  get f() { return this.formularioDeUsuario.controls; }

  salaSelecionada(event: any, item: any, index: any) {
    this.linhaSelecionada = index;
    this.selecionado = true;
    this.idSalaSelecionada = item.Id;
  }

  entrarSala() {
    this.erro = '';
    this.formularioDeUsuario.get('senha').reset();
    this.carregar = true;
    //Verifica se o usuário já está participando da sala
    if (this.listaSalas[this.linhaSelecionada].Participando) {
      this.salasService.buscarSimuladosPorSala(this.idSalaSelecionada).pipe(first()).subscribe(
        resposta => {
          this.carregar = false;
          this.router.navigate(['aluno/listasimuladossala']);
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
    } else {
      this.carregar = false;
      $(this.modalSenha.nativeElement).modal('show');
    }
  }

  participarSala() {
    this.participar = true;
    this.salasService.participarSala(
      this.idSalaSelecionada, this.formularioDeUsuario.get('senha').value).pipe(first()).subscribe(
        resposta => {
          this.participar = false;
          this.router.navigate(['aluno/listasimuladossala']);
          $(this.modalSenha.nativeElement).modal('hide');
          this.toastr.success('Lista de simulados da sala', '', {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'decreasing',          
          });
        },
        error => {
          this.participar = false;
          this.erro = error.toString().replace("Error:", "");
        });
  }

}
