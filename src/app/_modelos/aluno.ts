import { Usuario } from './usuario';

/**
 * Modelo Aluno que extende da classe Usuário
 */
export class Aluno extends Usuario {
    Matricula: number;
    AnoIngresso: number;
}