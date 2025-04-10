# Backend

## Recursos utilizados

- Docker (Containerização e isolamento do ambiente de desenvolvimento)
- Zod (Validação de schemas e tipos em tempo de execução)
- Node.js (Ambiente de execução Javascript server-side)
- Typescript (Superset do Javascript com tipagem estática)
- Prisma (ORM para banco de dados com suporte a migrations e modelagem)
- PostgresSQL (Sistema de gerenciamento de banco de dados relacional)
- Fastify (Framework web rápido e eficiente para Node.js)

## 📂 Estrutura

```
backend/
├── prisma/                    # Configurações e arquivos do Prisma ORM
│   ├── migrations/            # Migrações do banco de dados
│   ├── schema.prisma          # Definição do esquema do banco de dados
│   └── seed.ts                # Popular banco com 15 mesas
├── src/
│   ├── env/                   # Lidar com as variáveis de ambiente
│   ├── http/                  # Lidar com todas as requisições
│   │   ├── controllers/       # Controladores para gerenciar as requisições
│   │   ├── middlewares/       # Middlewares para validações e autenticação
│   │   ├── routes/            # Definição das rotas da API
│   │   └── schemas/           # Validação da entrada de dados atraves das requisições
│   ├── persistence/           # Biblioteca principal de conexão do banco
│   ├── persistence/           # Lógica com query para request ao banco de dados
│   ├── services/              # Lógica de negócios e integração com o banco
│   │   ├── errors/            # Classe para lidar com erros e excessões
│   │   ├── factories/         # Factories e persistências para criação
│   │   ├── use_cases/         # Casos de uso relacionados
│   ├── utils/                 # Funções utilitárias e helpers
│   ├── index.ts               # Arquivo principal para inicializar o servidor
│   └── app.ts                 # Configuração do servidor (Fastify, middlewares, etc.)
├── .env.example               # Exemplo de variáveis de ambiente
├── docker-compose.yml         # Configuração do Docker para o backend
├── package.json               # Dependências e scripts do backend
└── tsconfig.json              # Configuração do TypeScript
```

## ✅ Checklist de Requisitos Funcionais

### 🧠 Backend

- [x] **Autenticação de usuários** (login)
- [x] Lógica para permitir reservas **somente das 18:00 às 23:59**, exceto **aos domingos**
- [x] Validação para evitar **conflito de horários** entre reservas
- [x] Persistência de dados com banco de dados **relacional**
- [x] Endpoints/API para:
  - [x] Login
  - [x] Cadastro
  - [x] Criar reserva
  - [x] Listar reservas (para painel admin e usuários)
  - [x] Cancelar reservas
- [x] Popular o banco de dados com dados de teste (manualmente ou via **seeds/factories**)

## Para rodar a aplicação localmente

1.  Abra o terminal dentro da pasta do projeto (./backend) e instale as dependencias;

```bash
npm install
```

Obs: Caso ja tenha o container listado no seu docker, apenas inicie ele e pule pro passo 5:

```bash
docker start reserva-restaurante
```

2. Abra o docker (recomendo usar docker desktop, se não tiver, baixe), e encerre todos conteiners que estiver ativo;

```bash
docker-compose down
```

3. Com o terminal aberto (dentro do diretorio ./backend aqui do projeto) digite o comando para iniciar o container docker:

```bash
docker-compose up -d
```

3.1. Confirme se o container reserva-restaurante esta criado

```bash
docker ps
```

![Image](https://github.com/user-attachments/assets/f5f2a6a4-f2c2-4b6b-a2a4-dba8b4ad2f99)

4. Confirme a conexão com o banco de dados com arquivo .env (crie o arquivo) e aplique conforme o exemplo .env.example

```bash
DATABASE_URL="postgresql://user:docker@localhost:5432/database_name"
```

5. Realiza a migração do banco

```bash
npx prisma migrate dev
```

6. Iniciar o backend;

```bash
npm run dev
```

7. Abra outro terminal para criar as mesas caso não tenha nenhuma cadastrada
   **Insere no banco 15 mesas**

```bash
npm run seed
```

8. Caso queira ver o banco de dados online

```bash
npx prisma studio
```

9. Caso deseja apenas testar as rotas com requisições pelo Postman, na raiz deste projeto possui o arquivo ''Reserva_Restaurante_collection.json'' onde contem toda collection necessaria.

Obs: Localmente o banco roda no localhost:3333, o docker no localhost:5432, se atente para que antes de rodar o projeto, essas portas estejam livres.
