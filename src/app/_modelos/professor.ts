import { Usuario } from './usuario';
import { EDisciplina } from './edisciplina';
export class Professor extends Usuario {
    disciplinas: Array<EDisciplina>;
}