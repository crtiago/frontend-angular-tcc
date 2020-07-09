import { Funcao } from './../_enuns/funcao';
export class User {
    id: number;
    cpf: string;
    nascimento: Date;
    nome: string;
    email: string;
    fone: string;
    senha: string;
    instituicao: string;
    imagemPerfil: string;
    tipoUsuario: Funcao;
}