import { ContaUsuario } from '../models/ContaUsuario';

export interface IValidacaoUsuarioProxy {
    acessarSistema(nome: string, senha: string): void;
}

export class ValidacaoUsuarioProxy implements IValidacaoUsuarioProxy {
    private contaUsuario: ContaUsuario;
    private usuariosValidos: Map<string, string>;

    constructor(contaUsuario: ContaUsuario) {
        this.contaUsuario = contaUsuario;
        this.usuariosValidos = new Map([
            ["admin", "1234"], // Usuário administrador
            ["usuario", "senha123"], // Usuário comum
        ]);
    }

    acessarSistema(nome: string, senha: string): void {
        if (this.validarUsuario(nome, senha)) {
            console.log("Acesso permitido. Bem-vindo ao sistema!");
            this.contaUsuario.exibirTipo();
        } else {
            console.log("Acesso negado. Nome ou senha inválidos.");
        }
    }

    private validarUsuario(nome: string, senha: string): boolean {
        return this.usuariosValidos.get(nome) === senha;
    }
}