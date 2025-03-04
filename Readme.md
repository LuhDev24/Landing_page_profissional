# LS|Soluções - Landing Page Profissional

Este repositório contém o código-fonte de uma landing page profissional desenvolvida para atrair mais clientes, gerar mais vendas e escalar negócios.

## Sobre o Projeto

Esta landing page foi criada com o objetivo de converter visitantes em clientes, destacando os benefícios dos serviços da LS|Soluções. Ela inclui um formulário de contato integrado a um banco de dados MySQL para coleta de leads.

## Tecnologias Utilizadas

* **Front-end:**
    * HTML5
    * CSS3
    * JavaScript
* **Back-end:**
    * Node.js
    * Express.js
    * MySQL
* **Outras Ferramentas:**
    * Git
    * GitHub
    * Netlify

## Funcionalidades

* **Formulário de Contato:** Coleta informações de contato dos visitantes e armazena em um banco de dados MySQL.
* **Validação de Formulário:** Valida os campos do formulário no back-end para garantir a integridade dos dados.
* **Design Responsivo:** A landing page é otimizada para visualização em diversos dispositivos (desktops, tablets e smartphones).
* **Integração com MySQL:** Os dados do formulário são armazenados em um banco de dados MySQL para gerenciamento de leads.

## Como Usar

1.  Clone este repositório:

    ```bash
    git clone [https://github.com/LuhDev24/ls-solucoes-web.git](https://github.com/LuhDev24/ls-solucoes-web.git)
    ```

2.  Navegue até o diretório do projeto:

    ```bash
    cd ls-solucoes-web
    ```

3.  Instale as dependências do Node.js:

    ```bash
    npm install
    ```

4.  Configure as credenciais do banco de dados no arquivo `index.js`.

5.  Inicie o servidor Node.js:

    ```bash
    node index.js
    ```

6.  Abra o arquivo `index.html` no seu navegador para visualizar a página.

## Configuração do Banco de Dados

1.  Crie um banco de dados MySQL com o nome `lucimar_landing_page_1`.
2.  Crie uma tabela chamada `contatos` com as seguintes colunas:
    * `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
    * `nome` (VARCHAR)
    * `telefone` (VARCHAR)
    * `email` (VARCHAR)
    * `forma_empresarial` (VARCHAR)
    * `data_envio` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
3.  Atualize as credenciais do banco de dados no arquivo `index.js`.

## Contato

Para mais informações, entre em contato com:

* **Autor:** Lucimar Santos
* **Email:** lucimarcontas@gmail.com
* **WhatsApp:** [Clique aqui para enviar uma mensagem](https://wa.me/5531991317574?text=Quero+Saber+Mais+sobre+Landing+Page)

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo `LICENSE` para mais detalhes.