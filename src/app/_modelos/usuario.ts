import { Funcao } from '../_enuns/funcao';

/**
 * Modelo Usuário, que será usada por Aluno e Professor
 */

export class Usuario {
    IdUsuario: number;
    CPF: string;
    Nascimento: Date;
    Nome: string;
    Senha: string;
    Email: string;
    Telefone: string;
    Instituicao: string;
    ImagemUsuario: string;
    TipoUsuario: Funcao;

    constructor(cpf: string, nascimento: Date, nome: string, senha: string, email: string, telefone: string,
        instituicao: string, imagemUsuario: string, tipoUsuario: Funcao) {
        this.CPF = cpf;
        this.Nascimento = nascimento;
        this.Nome = nome;
        this.Senha = senha;
        this.Email = email;
        this.Telefone = telefone;
        this.Instituicao = instituicao;
        this.ImagemUsuario = imagemUsuario;
        this.TipoUsuario = tipoUsuario;
    }
}