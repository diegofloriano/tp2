import { LegacyXMLSystem } from "./services/LegacyXMLSystem";
import { JsonToXmlAdapter } from "./adapters/JsonToXMLAdapter";
import { Credito } from "./models/pagamentos/Credito";
import { Debito } from "./models/pagamentos/Debito";
import { Pix } from "./models/pagamentos/Pix";

import { ContaFactory } from './factory/ContaFactory';
import { Endereco } from "./models/Endereco";
import { ContaAdmin } from "./models/ContaAdmin";
import { ValidacaoUsuarioProxy } from "./UsuarioProxy/ValidacaoUsuarioProxy";
import { ContaCliente } from "./models/ContaCliente";

// 1. Instância do sistema legado
const legacySystem = new LegacyXMLSystem();

// 2. Instância do adapter
const adapter = new JsonToXmlAdapter(legacySystem);

// 3. Dados do cliente em JSON (simulando entrada do frontend)
const clienteJson = JSON.stringify({
    id: 1,
    nome: "Maria Oliveira",
    cpf: "987.654.321-00",
    dtNascimento: "1985-05-15",
    endereco: {
        rua: "Avenida Brasil",
        numero: 1500,
        cidade: "Rio de Janeiro",
        estado: "RJ",
        cep: "20000-000"
    },
    formaPagamento: {
        tipo: "pix" // Pode ser "credito", "debito" ou "pix"
    }
});

// 4. Função para testar diferentes formas de pagamento
function testarFormasPagamento() {
    const formas = [
        { tipo: "credito", instancia: new Credito() },
        { tipo: "debito", instancia: new Debito() },
        { tipo: "pix", instancia: new Pix() }
    ];

    formas.forEach(forma => {
        console.log(`\nTestando ${forma.tipo}:`);
        console.log(forma.instancia.processarPagamento(10.50));
    });
}

// 5. Execução principal
console.log("=== Sistema de Cadastro da Sorveteria ===");

try {
    // Processa o cadastro
    const usuarioCadastrado = adapter.processarCadastro(clienteJson);

    // Resultados
    console.log("\n✅ Cadastro realizado com sucesso!");
    console.log("Dados do usuário:", {
        id: usuarioCadastrado.id,
        nome: usuarioCadastrado.nome,
        cidade: usuarioCadastrado.endereco.cidade,
        formaPagamento: usuarioCadastrado.formaPagamento.constructor.name
    });

    // Testa o processamento de pagamento
    console.log("\n💳 Teste de formas de pagamento:");
    testarFormasPagamento();

} catch (error) {
    console.error("\n❌ Erro no cadastro:", error instanceof Error ? error.message : error);
}

console.log("\n=== Fim da execução ===");


const conta1 = ContaFactory.criarConta('admin', 'João', 'joao@admin.com');
const conta2 = ContaFactory.criarConta('cliente', 'Maria', 'maria@cliente.com', new Endereco('Rua A', 123, 'São Paulo', 'SP', '01000-000'));
//const conta3 = ContaFactory.criarConta('cliente', 'JOta', 'Jotaa@cliente.com');

// Proxy para ContaAdmin
const proxyAdmin = new ValidacaoUsuarioProxy(contaAdmin);
console.log("\nTentativa de acesso para ContaAdmin:");
proxyAdmin.acessarSistema("admin", "1234"); // Credenciais válidas
proxyAdmin.acessarSistema("admin", "senhaErrada"); // Credenciais inválidas

// Proxy para ContaUsuarioComum
const proxyUsuarioComum = new ValidacaoUsuarioProxy(contaCliente);
console.log("\nTentativa de acesso para ContaUsuarioComum:");
proxyCliente.acessarSistema("usuario", "senha123"); // Credenciais válidas
proxyCliente.acessarSistema("usuario", "senhaErrada"); // Credenciais inválidas


console.log(conta1);
conta1.exibirTipo();
console.log(conta2);
conta2.exibirTipo();


const contaAdmin = new ContaAdmin("Administrador", "admin@email.com");
const proxy = new ValidacaoUsuarioProxy(contaAdmin);

// Tentativa de acesso com credenciais válidas
proxy.acessarSistema("admin", "1234");

// Tentativa de acesso com credenciais inválidas
proxy.acessarSistema("usuario", "senhaErrada");