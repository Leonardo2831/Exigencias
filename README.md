# Exigências - Gerenciador de Exigências Cartorárias

Este projeto foi desenvolvido para otimizar e facilitar o gerenciamento de notas de exigência enviadas aos clientes do Cartório de Registro de Imóveis de Andradas. A aplicação permite o controle eficaz de prazos, depósitos prévios e status dos protocolos, garantindo maior agilidade e organização no fluxo do meu trabalho.

## 📋 Funcionalidades Principais

-   **Gestão de Protocolos**: Cadastro e visualização de exigências separadas por categorias:
    -   Escrituras Públicas
    -   Documentos Particulares
    -   Títulos Judiciais
-   **Controle de Status**:
    -   **Vigentes**: Exigências dentro do prazo.
    -   **Vencidas**: Monitoramento automático de prazos expirados.
    -   **Depósito Prévio Vencido**: Alerta para casos onde o protocolo com depósito prévio expirou.
    -   **Concluídas**: Histórico de protocolos resolvidos.
-   **Operações Rápidas**:
    -   Mover protocolos entre listas (ex: de vigentes para concluídos ou vencidos).
    -   Copiar dados formatados (tabulação) para fácil colagem no Excel.
    -   Excluir protocolos quando necessário.
-   **Validações**:
    -   Validação de CPF e CNPJ nos formulários.
    -   Verificação automática de datas de vencimento utilizando `dayjs`.
-   **Interface Moderna**: Design limpo e responsivo construído com _Tailwind CSS_.

## � Screenshots

<div align="center">
  <!-- Adicione suas imagens aqui. Exemplo: -->
  <!-- <img src="caminho/para/imagem.png" alt="Descrição da Imagem" width="600"> -->
  
  <p><i>Imagens do projeto em funcionamento</i></p>
</div>

## �🚀 Tecnologias Utilizadas

-   **Frontend**: HTML5, CSS3 (Tailwind CSS 4), TypeScript.
-   **Bibliotecas**:
    -   `dayjs`: Manipulação e formatação de datas.
-   **Backend (Simulado)**: `json-server` para persistência de dados em arquivo JSON local.

## 📦 Instalação e Execução

Para rodar o projeto localmente, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) instado em sua máquina.

### Passos

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/Leonardo2831/Exigencias.git
    cd Exigencias
    ```

2. **Instale as dependências:**

    ```bash
    npm install
    ```

3. **Inicie a aplicação:**
   O projeto necessita de três terminais rodando simultaneamente para funcionar completamente (build do TS, build do CSS e o servidor de dados):

    - **Terminal 1 (TypeScript Watch):**
        ```bash
        npm run ts
        ```
    - **Terminal 2 (Tailwind CSS Watch):**
        ```bash
        npm run tailwind
        ```
    - **Terminal 3 (JSON Server):**
        ```bash
        npm run server
        ```

4. **Acesse no navegador:**
   Abra o arquivo `index.html` no seu navegador ou utilize uma extensão como Live Server.

## 🛠️ Estrutura do Projeto

-   **`public/database/`**: Contém o arquivo `exigencias.json` que armazena os dados.
-   **`public/typescript/`**: Código fonte da lógica da aplicação.
-   **`public/styles/`**: Arquivos de estilo (entrada e saída do Tailwind).
-   **`public/images/`**: Ícones e logo.

## 📄 Licença

Este projeto está licenciado sob a licença **GPL-3.0**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Leonardo Reis Ferraz**

---

_Desenvolvido para auxiliar na eficiência do meu serviço no cartório de registro de imóveis de Andradas._
