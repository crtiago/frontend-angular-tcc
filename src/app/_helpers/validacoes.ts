import { AbstractControl, FormGroup } from '@angular/forms';

/**
 * Classe responsável por fazer as validações necessárias em inputs como CPF, Menor de 16, Confirmação 
 * de senha.
 */

export class Validacoes {

    /**
     * Método que valida o CPF, só é aceito CPF válido
     */
    static validarCPF(controle: AbstractControl) {

        const cpf = controle.value.replace(/[^\d]+/g, '');
        if (cpf == '') return { cpfInvalido: null };
        // Elimina CPFs invalidos conhecidos	
        if (cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999")
            return { cpfInvalido: true };;
        // Valida 1o digito	
        let add = 0;
        for (let i = 0; i < 9; i++)
            add += parseInt(cpf.charAt(i)) * (10 - i);
        let rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(9)))
            return { cpfInvalido: true };;
        // Valida 2o digito	
        add = 0;
        for (let i = 0; i < 10; i++)
            add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(10)))
            return { cpfInvalido: true };
        return null
    }

    /**
     * Método que verifica se o usuário é maior de 16 anos
     */
    static maiorQue16Anos(controle: AbstractControl) {
        const nascimento = controle.value;
        const [ano, mes, dia] = nascimento.split('-');
        const hoje = new Date();
        const dataNascimento = new Date(ano, mes, dia, 0, 0, 0);
        const tempoParaTeste = 1000 * 60 * 60 * 24 * 365 * 16; //16 anos em mili segundos...

        if (hoje.getTime() - dataNascimento.getTime() >= tempoParaTeste)
            return null;

        return { menorDe16: true };
    }

    /**
     * Método para validar o ano, não permitindo ano posterior ao que está, e inferior
     * ao atual menos 80 anos
     */
    static validarAno(controle: AbstractControl){
        const ano = controle.value;
        const anoAtual = new Date();
        const anoLimiteInferior = anoAtual.getFullYear() - 80;

        if((ano > anoAtual.getFullYear()) || (ano < anoLimiteInferior)){
            return { anoInvalido: true};    
        }
        return null;        
    }

    /**
     * Método que verifica se as senhas são iguais ou não
     */
    static conferem(senha: string, confirmarSenha: string) {
        return (formGroup: FormGroup) => {
            const _senha = formGroup.controls[senha];
            const _confirmarSenha = formGroup.controls[confirmarSenha];

            if (_confirmarSenha.errors && !_confirmarSenha.errors.naoConferem) {
                // Retorna se outro validador já encontrou um erro no Confirmar Senha
                return;
            }

            // Define erro em Confirmar Senha se a validação falhar
            if (_senha.value !== _confirmarSenha.value) {
                _confirmarSenha.setErrors({ naoConferem: true });
            } else {
                _confirmarSenha.setErrors(null);
            }
        }
    }

    /**
     * Método que verifica o max e o min do campo quantidade de questões
     */
    static validarQuantidadeQuestoes(quantidade: string) {
        return (formGroup: FormGroup) => {
            const _quantidade = formGroup.controls[quantidade];

            if (_quantidade.errors) {
                // Retorna se outro validador já encontrou um erro
                return;
            }

            if (_quantidade.value < 1) {
                _quantidade.setErrors({ minimo: true });
            } else if(_quantidade.value > 30) {
                _quantidade.setErrors({ maximo: true });
            }else{
                _quantidade.setErrors(null);
            }
        }
    }

    /**
     * Método que verifica o max e o min do campo tempo de simulado
     */
    static validarTempoSimulado(tempoSimulado: string) {
        return (formGroup: FormGroup) => {
            const _tempoSimulado = formGroup.controls[tempoSimulado];

            if (_tempoSimulado.errors) {
                // Retorna se outro validador já encontrou um erro
                return;
            }

            if (_tempoSimulado.value < 10) {
                _tempoSimulado.setErrors({ minimo: true });
            } else if(_tempoSimulado.value > 480) {
                _tempoSimulado.setErrors({ maximo: true });
            }else{
                _tempoSimulado.setErrors(null);
            }
        }
    }
}