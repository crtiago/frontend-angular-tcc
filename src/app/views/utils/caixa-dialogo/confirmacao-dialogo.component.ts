import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmacao-dialogo',
  templateUrl: './confirmacao-dialogo.component.html',
  styleUrls: ['./confirmacao-dialogo.component.css']
})
export class ConfirmacaoDialogoComponent implements OnInit {

  @Input() mensagem: string;
  @Input() btnOkTexto: string;
  @Input() btnCancelarTexto: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  public rejeitar() {
    this.activeModal.close(false);
  }

  public aceitar() {
    this.activeModal.close(true);
  }

  public dispensar() {
    this.activeModal.dismiss();
  }

}
