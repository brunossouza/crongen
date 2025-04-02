# Gerador de Cron (Crongen)

[![en-US](https://img.shields.io/badge/Language-English-red.svg)](README.en.md)

Uma aplicação web simples para gerar expressões cron sem precisar memorizar a sintaxe.

## 📋 Sobre

O Gerador de Cron é uma ferramenta web que ajuda a criar expressões cron através de uma interface amigável. Expressões cron são utilizadas para agendar tarefas recorrentes em sistemas baseados em Unix e em várias outras plataformas e linguagens de programação.

## 🌐 Demo Online

Acesse a demonstração online em: [https://crongen.bs.dev.br/](https://crongen.bs.dev.br/)

## 🚀 Tecnologias

- TypeScript
- Vite
- HTML5 / CSS3
- Docker & Nginx (para implantação)

## 🔧 Instalação e Execução Local

**Pré-requisitos:**
- Node.js (versão 16 ou superior)
- Yarn (ou npm)

**Passos:**

1. Clone o repositório:
   ```bash
   git clone [url-do-repositorio]
   cd crongen
   ```

2. Instale as dependências:
   ```bash
   yarn install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   yarn dev
   ```

4. Acesse a aplicação em:
   ```
   http://localhost:5173
   ```

## 🐳 Execução com Docker

Se preferir, você pode executar a aplicação usando Docker:

1. Clone o repositório:
   ```bash
   git clone [url-do-repositorio]
   cd crongen
   ```

2. Execute com Docker Compose:
   ```bash
   docker-compose up -d
   ```

3. Acesse a aplicação em:
   ```
   http://localhost:8080
   ```

## 📦 Build para Produção

Para gerar a build de produção:

```bash
yarn build
```

Os arquivos serão gerados na pasta `dist`.

## 📝 Como Utilizar

1. Selecione a frequência desejada (uma vez específica, diariamente, semanalmente ou mensalmente)
2. Informe a data e hora
3. Clique em "Gerar Expressão Cron"
4. A expressão cron será exibida e uma explicação detalhada do seu funcionamento será fornecida
