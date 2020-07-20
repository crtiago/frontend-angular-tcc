import { EDisciplina } from './../_enuns/edisciplinas';
import { Usuario } from './usuario';

/**
 * Modelo Professor que extende da classe Usuário
 */

export class Professor extends Usuario {
    DisciplinasInteressadas: Array<EDisciplina>;
}