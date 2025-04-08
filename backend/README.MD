# Backend

## ✅ Checklist de Requisitos Funcionais

### 🧠 Backend

- [ ] **Autenticação de usuários** (login)
- [ ] Lógica para permitir reservas **somente das 18:00 às 23:59**, exceto **aos domingos**
- [ ] Validação para evitar **conflito de horários** entre reservas
- [ ] Persistência de dados com banco de dados **relacional**
- [ ] Endpoints/API para:
  - [ ] Login
  - [ ] Criar reserva
  - [ ] Listar reservas (para painel admin)
- [ ] Popular o banco de dados com dados de teste (manualmente ou via **seeds/factories**)

## Para rodar a aplicação localmente

1. Abra o docker, e encerre todos conteiners que estiver ativo;
2. Com o terminal aberto digite o comando para iniciar o container docker:

```bash
docker start reserva-restaurante
```

2.2 Realiza a migração do banco

```bash
npx prisma migrate
```

3. Abra outro terminal para iniciar o banco de dados;

```bash
npm run dev
```

4. Abra outro terminal para criar as mesas caso não tenha nenhuma cadastrada
   **Insere no banco 15 mesas**

```bash
npm run seed
```

5. Caso queira ver o banco de dados online

```bash
npx prisma studio
```

6. Caso deseja apenas testar as rotas com requisições pelo Postman, na raiz deste projeto possui o arquivo ''reserva-restaurante-collection.json'' onde contem toda collection necessaria.

Obs: Localmente o banco roda no localhost:3333, o docker no localhost:5432, se atende para que antes de rodar o projeto, essas portas estejam livres.
