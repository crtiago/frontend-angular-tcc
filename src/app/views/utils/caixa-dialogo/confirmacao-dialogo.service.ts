import { ConfirmacaoDialogoComponent } from './confirmacao-dialogo.component';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class ConfirmacaoDialogoService {

    constructor(private modalService: NgbModal) { }

    public confirm(
        imagem: string,
        mensagem: string,
        btnOkTexto: string = 'Sim',
        btnCancelarTexto: string = 'Cancelar',
        dialogSize: 'sm-1' | 'lg' = 'sm-1'): Promise<boolean> {
        const modalRef = this.modalService.open(ConfirmacaoDialogoComponent, { size: dialogSize });
        modalRef.componentInstance.imagem = imagem;
        modalRef.componentInstance.mensagem = mensagem;
        modalRef.componentInstance.btnOkTexto = btnOkTexto;
        modalRef.componentInstance.btnCancelarTexto = btnCancelarTexto;

        return modalRef.result;
    }

}
