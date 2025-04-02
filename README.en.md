# Cron Generator (Crongen)

[![pt-BR](https://img.shields.io/badge/Idioma-Português-blue.svg)](README.md)

A simple web application to generate cron expressions without having to memorize the syntax.

## 📋 About

The Cron Generator is a web tool that helps create cron expressions through a friendly interface. Cron expressions are used to schedule recurring tasks in Unix-based systems and in various other platforms and programming languages.

## 🌐 Online Demo

Access the online demo at: [https://crongen.bs.dev.br/](https://crongen.bs.dev.br/)

## 🚀 Technologies

- TypeScript
- Vite
- HTML5 / CSS3
- Docker & Nginx (for deployment)

## 🔧 Installation and Local Execution

**Prerequisites:**
- Node.js (version 16 or higher)
- Yarn (or npm)

**Steps:**

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd crongen
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn dev
   ```

4. Access the application at:
   ```
   http://localhost:5173
   ```

## 🐳 Running with Docker

If you prefer, you can run the application using Docker:

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd crongen
   ```

2. Run with Docker Compose:
   ```bash
   docker-compose up -d
   ```

3. Access the application at:
   ```
   http://localhost:8080
   ```

## 📦 Production Build

To generate the production build:

```bash
yarn build
```

The files will be generated in the `dist` folder.

## 📝 How to Use

1. Select the desired frequency (specific once, daily, weekly or monthly)
2. Enter the date and time
3. Click on "Generate Cron Expression"
4. The cron expression will be displayed and a detailed explanation of how it works will be provided
