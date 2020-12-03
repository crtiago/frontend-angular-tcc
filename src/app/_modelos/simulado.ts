export class Simulado {
    DataFimSimulado: Date;
    DataInicio: Date;
    Descricao: string;
    Id: number;
    IdUsuario: number;
    Nome: string;
    QuantidadeQuestoes: number;
    Questoes: {};
    TempoMaximo: number;
    TipoSimulado: number;
    dataCriacao: Date;

    constructor(DataFimSimulado?: Date,
        DataInicio?: Date,
        Descricao?: string,
        Id?: number,
        IdUsuario?: number,
        Nome?: string,
        QuantidadeQuestoes?: number,
        Questoes?: {},
        TempoMaximo?: number,
        TipoSimulado?: number,
        dataCriacao?: Date) {
        this.DataFimSimulado = DataFimSimulado;
        this.DataInicio = DataInicio;
        this.Descricao = Descricao;
        this.Id = Id;
        this.IdUsuario = IdUsuario;
        this.Nome = Nome;
        this.QuantidadeQuestoes = QuantidadeQuestoes;
        this.Questoes = Questoes;
        this.TempoMaximo = TempoMaximo;
        this.TipoSimulado = TipoSimulado;
        this.dataCriacao = dataCriacao;
    }
}