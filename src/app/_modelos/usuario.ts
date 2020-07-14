import { Funcao } from '../_enuns/funcao';
export class Usuario {
    id: number;
    CPF: string;
    nascimento: Date;
    nome: string;
    email: string;
    fone: string;
    senha: string;
    instituicao: string;
    imagemPerfil: null;
    TipoUsuario: Funcao;
}