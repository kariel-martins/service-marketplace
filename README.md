# Service marketplace API

Service marketplace é uma API REST de agendamentos, criada para resolver problemas comuns entre profissionais autônomos e seus clientes como, comunicação entre profissional e cliente, esquecimentos e falta de organização para marcar seus serviços.

### Motivação e Decisão do Projeto

A ideia da API nasceu de uma necessidade real da minha cidade: muitos profissionais não possuem uma ferramenta adequada para organizar seus atendimentos. A maioria utiliza apenas o WhatsApp para gerenciar horários, o que torna o controle de agenda confuso, sujeito a erros e difícil de escalar.

### O que a API faz?

- Autenticação de usuários (admin)
- Proteção de rotas via JWT
- Cadastro e gerenciamento de profissionais
- Cadastro e gerenciamento de clientes
- Cadastro e gerenciamento de serviços
- Cadastro e gerenciamento de agendamentos
- Controle de disponibilidade para clientes
- Envio de e-mails e WhatsApp (futuramente)

## Sistema

- Integração com fila de mensagens (RabbitMQ)(futuramente)
- Envio de e-mails (Resend/ nodemailer) (futuramente)
- Envio de e-mails (Resend/ nodemailer) (futuramente)
- Cache(redis) (futuramente)
- API REST modularizada
- Separação clara entre camadas (Controller, Service, Repository)
- Swagger (docs)

## Tecnologias

- Node.js
- TypeScript
- fastify
- Drizzle ORM
- PostgreSQL
- Docker
- JWT
- Zod (validação)

## Pré-requisitos
Antes de iniciar, certifique-se de ter instalado:

- Node.js v18+
- Docker e Docker Compose
- PostgreSQL
- Git

## Instalação e Execução

### 1️ - Clonar o repositório
- Terminal:
  
  ```bash
  
    git clone https://github.com/kariel-martins/service-marketplace
  
  ```
### 2 - Configurar o arquivo env:
- Crie o arquivo .env:
  
  ```env
  
    NODE_ENV=[seu ambiente]
    
    PORT=5555
    
    DEBUG=false
    
    JWT_SECRET=

    COOKIES_SECRET=
    
    DATABASE_URL=
  
  ```
### 3 - Configurar o Backend:
- Terminal:
  
  ```bash
  
    npm install
  
  ```
- Envia migrações ou fazer arquivos drizzle ou abrir a interface:
  ```bash
  
    npm run db generate
    npm run db migrate
    npm run db studio
  
  ```
#### com docker:
- Subir os containers postgres:
  ```bash
  
    docker-compose up -d
  
  ```
  - Rodar a api:
  ```bash
  
    npm run docker
  
  ```
#### Em ambiente de desenvolvimento "TYPESCRIPT":
Para rodar em desenvolvimento, no DATABASE_URL deve conter uma url de um banco de dados real.

- Rodar a api:
  ```bash
  
    npm run dev
  
  ```
#### Em ambiente de production "JAVASCRIPT":
Para rodar em desenvolvimento, no DATABASE_URL deve conter uma url de um banco de dados real.

- Rodar a api:
  ```bash
  
    npm run prod
  
  ```
## 🌐 Acesso Local
_ Serviço URL
  Backend API http://localhost:3401
## 🗂️ Estrutura do Projeto
### 📦 Backend
    /src
    ├── config
    ├── core
    │   ├── errors
    │   └── handlers
    ├── database
    |    ├── jobs
    |    ├── seeds
    |    ├── client.ts
    │   └── Schemas.ts
    ├── modules
    |   ├── Appointment
    │   ├── auth
    │   │   ├── controllers
    │   │   ├── factory
    │   │   ├── dtos
    │   │   ├── messages
    │   │   ├── repositories
    │   │   ├── routes
    │   │   └── services
    |   ├── Availiability
    |   ├── business
    |   ├── Clients
    |   ├── NoShowRules
    |   ├── Professional
    |   ├── Service
    |   ├── Users
    ├── plugins
    ├── share
    |   └── interfaces
    |   └── middlewares
    |   └── providers
    |   └── services
    |   └── types
    |   └── utils
    ├── Types
    ├── app.ts
    └── server.ts

### 🧱 Arquitetura
### O projeto segue princípios de:
  - Separação de responsabilidades
  - Arquitetura em camadas
  - Modularização por domínio
  - Baixo acoplamento
  - Alta coesão
  - Padrão Repository + Service
## 📄 Licença
Este projeto está sob a licença MIT. Sinta-se livre para usar, modificar e contribuir.

## 👨‍💻 Autor
  Desenvolvido por Kariel Emanoel Silva Martins

💼 LinkedIn: https://www.linkedin.com/in/kariel-martins

📧 Email: karielemanoel.17@gmail.com


  
