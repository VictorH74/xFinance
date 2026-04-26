# xFinance

Projeto fullstack com:

- `xfinance-backend`: API em Node.js + Express + Prisma
- `xfinance-frontend`: aplicação web em Next.js

## Pré-requisitos

- Node.js 20+ instalado
- npm instalado
- PostgreSQL rodando localmente ou em container

## Estrutura

```text
xFinance/
  xfinance-backend/
  xfinance-frontend/
```

## Backend

O backend roda na porta `4000`.

### 1. Instalar dependências

```bash
cd xfinance-backend
npm install
```

### 2. Configurar variáveis de ambiente

Crie o arquivo `.env` dentro de `xfinance-backend/`.

Exemplo recomendado para desenvolvimento com Postgres direto:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/xfinance?schema=public"
```

Se quiser, ajuste usuário, senha, porta e nome do banco conforme o seu ambiente.

### 3. Rodar as migrations do Prisma

```bash
npx prisma migrate dev
```

Esse comando:

- cria a pasta de migrations quando necessário
- aplica as migrations no banco
- atualiza o Prisma Client

### 4. Popular o banco com dados mock

```bash
npm run seed
```

O seed usa os arquivos em [xfinance-backend/prisma/data/mocks](/home/victorleal/projects/apps/web/fullstack/node-next/xFinance/xfinance-backend/prisma/data/mocks).

### 5. Subir o backend

```bash
npm run dev
```

Servidor disponível em:

```text
http://localhost:4000
```

## Frontend

O frontend roda na porta `3000`.

### 1. Instalar dependências

Em outro terminal:

```bash
cd xfinance-frontend
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env.local` dentro de `xfinance-frontend/`:

```env
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

Essas variáveis são usadas pelo cliente HTTP e pelas rotas de autenticação do frontend.

### 3. Subir o frontend

```bash
npm run dev
```

Aplicação disponível em:

```text
http://localhost:3000
```

## Fluxo Completo

Com tudo configurado, o fluxo local costuma ser:

```bash
cd xfinance-backend
npm install
npx prisma migrate dev
npm run seed
npm run dev
```

Em outro terminal:

```bash
cd xfinance-frontend
npm install
npm run dev
```

## Comandos úteis

### Backend

```bash
npm run dev
npm run build
npm run seed
npx prisma studio
```

### Frontend

```bash
npm run dev
npm run build
npm run start
```

## Observações

- O backend depende de `DATABASE_URL` válida.
- Se `npx prisma migrate dev` falhar com erro de conexão, verifique se o PostgreSQL está rodando e se a porta da `DATABASE_URL` está correta.
- O frontend espera que a API esteja disponível em `http://localhost:4000`, a menos que você configure outra URL no `.env.local`.
