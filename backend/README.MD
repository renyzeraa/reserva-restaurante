# Backend

## Recursos utilizados

- Docker (Containerização e isolamento do ambiente de desenvolvimento)
- Zod (Validação de schemas e tipos em tempo de execução)
- Node.js (Ambiente de execução Javascript server-side)
- Typescript (Superset do Javascript com tipagem estática)
- Prisma (ORM para banco de dados com suporte a migrations e modelagem)
- PostgresSQL (Sistema de gerenciamento de banco de dados relacional)
- Fastify (Framework web rápido e eficiente para Node.js)

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

1. Instale as dependencias;

```bash
npm install
```

2. Abra o docker, e encerre todos conteiners que estiver ativo;
3. Com o terminal aberto digite o comando para iniciar o container docker:

```bash
docker start reserva-restaurante
```

3.1 Realiza a migração do banco

```bash
npx prisma migrate
```

4. Abra outro terminal para iniciar o banco de dados;

```bash
npm run dev
```

5. Abra outro terminal para criar as mesas caso não tenha nenhuma cadastrada
   **Insere no banco 15 mesas**

```bash
npm run seed
```

6. Caso queira ver o banco de dados online

```bash
npx prisma studio
```

7. Caso deseja apenas testar as rotas com requisições pelo Postman, na raiz deste projeto possui o arquivo ''reserva-restaurante-collection.json'' onde contem toda collection necessaria.

Obs: Localmente o banco roda no localhost:3333, o docker no localhost:5432, se atende para que antes de rodar o projeto, essas portas estejam livres.
