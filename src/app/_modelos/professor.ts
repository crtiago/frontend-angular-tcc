import { Funcao } from './../_enuns/funcao';
import { EDisciplina } from './../_enuns/edisciplinas';
import { Usuario } from './usuario';

/**
 * Modelo Professor que extende da classe Usuário
 */

export class Professor extends Usuario {
    DisciplinasInteressadas: string [];

    constructor(cpf: string, nascimento: Date, nome: string, senha: string, email: string, telefone: string,
        instituicao: string, imagemUsuario: string, tipoUsuario: Funcao, disciplinasInteressadas: string []) {
        super(cpf, nascimento, nome, senha, email, telefone, instituicao, imagemUsuario, tipoUsuario);
        this.DisciplinasInteressadas = disciplinasInteressadas;
    }
}