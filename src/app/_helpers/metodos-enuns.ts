import { EDisciplina } from './../_enuns/edisciplinas';

/**
 * Classe responsável por tratar o Enum da Disciplina
 */
export class MetodosEnuns {
    // Retorna as chaves do enum
    getChaves(): Array<string> {
        const chaves = Object.keys(EDisciplina);
        return chaves;
    }

    // Retorna os valores do enum
    getValores(): Array<string> {
        const valores = Object.keys(EDisciplina);
        return valores.map(el => Object(EDisciplina)[el]);
    }
}