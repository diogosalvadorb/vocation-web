# Vocation 📚

**Seu caderno de vocabulário** — uma plataforma pessoal de aprendizado de inglês com rastreamento de vocabulário, cronômetros de estudo, frases comuns e métricas de playlist "input" do YouTube API.

---

## Deploy

O projeto está  publicado na [Vercel](https://vercel.com).


---

## Funcionalidades

- **Aba Palavras** — Adicione palavras em inglês com tradução para português, gera pronúncia em áudio via OpenAI e adicione frases de exemplo
- **Aba Frases Comuns** — Armazene frases comuns em inglês organizadas por categorias, com reprodução de áudio
- **Aba Métricas** — Acompanhe sessões de leitura e escrita com cronômetros e monitore a duração da sua playlist de input em inglês no YouTube

---

## Stack Tecnológico

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript |
| Estilização | Tailwind CSS v4 + shadcn/ui |
| Banco de Dados | PostgreSQL + Prisma ORM |
| Autenticação | better-auth (Google OAuth) |
| Formulários | react-hook-form + Zod |
| Server Actions | next-safe-action |
| Áudio | OpenAI TTS API + Cloudflare R2 |
| Componentes UI | Radix UI + Lucide React |

---

## Pré-requisitos

- Node.js 20.9.0
- Banco de dados PostgreSQL
- Credenciais do Google OAuth
- Chave de API da OpenAI
- Bucket no Cloudflare R2 (para armazenamento de áudio)

---

## Como Começar

### 1. Clone e instale as dependências

```bash
git clone https://github.com/diogosalvadorb/vocation-web.git
cd vocation-web
npm install
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Banco de Dados
DATABASE_URL="postgresql://usuario:senha@localhost:5432/vocation"

# Autenticação
BETTER_AUTH_SECRET="sua-chave-secreta"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="seu-google-client-id"
GOOGLE_CLIENT_SECRET="seu-google-client-secret"

# OpenAI
OPENAI_API_KEY="sua-openai-api-key"

# Cloudflare R2
CLOUDFLARE_R2_ACCOUNT_ID="seu-account-id"
CLOUDFLARE_R2_ACCESS_KEY_ID="seu-access-key-id"
CLOUDFLARE_R2_SECRET_ACCESS_KEY="seu-secret-access-key"
CLOUDFLARE_R2_BUCKET_NAME="nome-do-seu-bucket"
CLOUDFLARE_R2_PUBLIC_URL="https://sua-url-publica.r2.dev"

# Criptografia (para chaves da API do YouTube armazenadas no banco)
ENCRYPTION_KEY="string-hexadecimal-de-64-caracteres"
```

Para gerar uma chave de criptografia:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Configure o banco de dados

```bash
npx prisma gerenarate
npx prisma db push
```

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.
