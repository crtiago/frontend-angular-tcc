export class Resposta {

    IdQuestao: number;
    Respondida: boolean; 
    RespostaQuestao: string; 
    TipoQuestao: number;

    constructor(IdQuestao: number, Respondida: boolean, RespostaQuestao: string, TipoQuestao: number) {
        this.IdQuestao = IdQuestao;
        this.Respondida = Respondida;
        this.RespostaQuestao = RespostaQuestao;
        this.TipoQuestao = TipoQuestao;
    }

}