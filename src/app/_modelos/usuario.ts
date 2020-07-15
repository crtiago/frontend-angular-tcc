import { Funcao } from '../_enuns/funcao';

/**
 * Modelo Usuário
 */

export class Usuario {
    IdUsuario: number;
    CPF: string;
    Nascimento: Date;
    Nome: string;
    Email: string;
    Telefone: string;
    Instituicao: string;
    ImagemUsuario: null;
    TipoUsuario: Funcao;
}