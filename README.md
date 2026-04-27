# xFinance

Projeto fullstack com:

- `xfinance-backend`: API em Node.js + Express + Prisma
- `xfinance-frontend`: aplicação web em Next.js

## Pré-requisitos

- Node.js 20+ instalado
- npm instalado
- Docker
- Python3

## Estrutura

```text
xFinance/
  xfinance-backend/
  xfinance-frontend/
```

## Raiz do projeto

### 1. Gerar arquivos de variáveis de ambiente

Na pasta raiz, execute os comandos abaixo para gerar o arquivo `.env.local` em `xfinance-frontend/` e `.env` em `xfinance-backend/`

```bash
cp ./xfinance-frontend/.env.local.example ./xfinance-frontend/.env.local
cp ./xfinance-backend/.env.example ./xfinance-backend/.env
```

### 2. Subir banco de dados via docker

```bash
docker run --name xfinance-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=xfinance \
  -p 5432:5432 \
  -d postgres:16
```

## Backend

O backend roda na porta `4000`.

### 1. Instalar dependências

```bash
cd xfinance-backend
npm install
```

### 2. Configurar variáveis de ambiente

Arquivo `.env` de `xfinance-backend/`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/xfinance?schema=public"
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
```

Execute o comando `python3 -c "import secrets; print(secrets.token_urlsafe())"` no terminal, copie o hash retornado e cole nas variáveis `JWT_ACCESS_SECRET` e `JWT_ACCESS_SECRET`

### 3. Subir banco de dados via docker

```bash
docker run --name xfinance-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=xfinance \
  -p 5432:5432 \
  -d postgres:16
```

### 4. Rodar as migrations do Prisma

```bash
npx prisma migrate dev
```

Esse comando:

- cria a pasta de migrations quando necessário
- aplica as migrations no banco
- atualiza o Prisma Client

### 5. Popular o banco com dados mock

```bash
npm run seed
```

O seed usa os arquivos em [xfinance-backend/prisma/data/mocks](/home/victorleal/projects/apps/web/fullstack/node-next/xFinance/xfinance-backend/prisma/data/mocks).

### 6. Subir o backend

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

### 2. Subir o frontend

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
