import { Funcao } from './../_enuns/funcao';
import { Usuario } from './usuario';

/**
 * Modelo Aluno que extende da classe Usuário
 */
export class Aluno extends Usuario {
    Matricula: number;
    AnoIngresso: number;

    constructor(cpf: string, nascimento: Date, nome: string, senha: string, email: string, telefone: string,
        instituicao: string, imagemUsuario: string, tipoUsuario: Funcao, matricula: number, anoIngresso: number) {
        super(cpf, nascimento, nome, senha, email, telefone, instituicao, imagemUsuario, tipoUsuario);
        this.Matricula = matricula;
        this.AnoIngresso = anoIngresso;
    }
}