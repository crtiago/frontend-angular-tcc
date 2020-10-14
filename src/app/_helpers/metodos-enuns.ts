export class MetodosEnuns {
    // Retorna as chaves do enum
    getChaves(e: any): Array<string> {
        const chaves = Object.keys(e);
        return chaves;
    }

    // Retorna os valores do enum
    getValores(e: any): Array<string> {
        const valores = Object.keys(e);
        return valores.map(el => Object(e)[el]);
    }
}