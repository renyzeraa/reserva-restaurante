# Frontend

## Recursos utilizados

- Vue.js
- TypeScript (linguagem de programação)
- Bootstrap (framework CSS)
- vue-router (navegação)
- Pinia (guardar dados no front)
- Toast (para notificações)
- Js-Cookie (lidar com dados no cookies do navegador)

## 📂 Estrutura

```
frontend/
├── src/
│   ├── assets/                # imagens e icones usados
│   ├── components/            # Componentes usados nas views
│   ├── router/                # Definição das rotas de navegação na página
│   ├── services/              # Integração com a API
│   ├── store/                 # Lógica de autenticação do usuário e token JWT
│   ├── views/                 # Páginas que contem na aplicação
│   ├── App.vue                # Arquivo base com as rotas e a visualização das páginas
│   ├── main.ts                # Cria a página iniciando o vue
│   └── style.css              # Estilos base
├── index.html
├── package.json               # Dependências e scripts do frontend
└── tsconfig.json              # Configuração do TypeScript
```

## ✅ Checklist de Requisitos Funcionais

### 🖥️ Frontend

- [x] Interface de **login** (formulário de autenticação)
- [x] Interface para **realizar reservas** (com data e horário)
- [x] Bloqueio ou aviso para impedir reservas **fora do horário permitido** (18:00 às 23:59)
- [x] Bloqueio ou aviso para impedir reservas **aos domingos**
- [x] Feedback visual em caso de **conflito de horário** na reserva
- [x] Interface simples para o **painel administrativo** (tabela com reservas, horários e responsáveis) _(opcional, mas funcional)_
- [x] Visualizar minhas reservas
- [x] Permitir cancelar minhas reservas

## Para rodar a aplicação localmente

1. Instale as dependencias;

```bash
npm install
```

2. Execute o projeto

```bash
npm run dev
```

2.2 Lembrar de estar com o banco de dados sendo executado, para conseguir realizar o login e demais funcionalidades;
