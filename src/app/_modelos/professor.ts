import { Usuario } from './usuario';
import { EDisciplina } from './edisciplina';

/**
 * Modelo Professor que extende da classe Usuário
 */

export class Professor extends Usuario {
    DisciplinasInteressadas: Array<EDisciplina>;
}