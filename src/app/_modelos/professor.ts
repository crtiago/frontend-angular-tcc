import { EDisciplina } from './edisciplina';
import { User } from './user';
export class Professor extends User {
    disciplinas: Array<EDisciplina>;
}