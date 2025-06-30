# 🧠 Game Bot Engine - Template Base

Um **esqueleto de projeto** pronto para iniciar bots de jogo via WhatsApp.

> Este projeto **NÃO é um bot pronto**, mas sim uma **estrutura base** já configurada e organizada para começar seu próprio sistema.  
> Estrutura focada para jogos estilo RPGs via chat (WhatsApp).

---

## 🎯 O que já vem pronto?

✅ Estrutura modular de pastas  
✅ Integração com WhatsApp via `whatsapp-web.js`  
✅ Prisma + PostgreSQL com schema pré-configurado  
✅ Scripts de seed para popular o banco  
✅ Comandos organizados por domínio  
✅ Serviços separados com lógica de negócio  
✅ Menu interativo via terminal (`prisma-tools.js`)
✅ Bot local para testes (`local-bot.js`)

---

## 🚀 Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/d3v-mk/game-bot-engine.git
cd game-bot-engine
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar o banco de dados

Crie um arquivo `.env` com:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
```

### 4. Rodar migrations + gerar Prisma Client

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Popular o banco com dados iniciais (opcional)

```bash
npm run seed
```

---

## 📁 Estrutura do Projeto

```
├── db                      # Configurações de banco de dados (Prisma)
│   ├── client.js           # Instância do Prisma Client pra usar no projeto todo
│   └── prisma/             
│       └── schema.prisma   # Schema do banco: define modelos (Jogador, Org, etc)

├── game                    # Onde vive a lógica principal do bot
│   ├── commands/           # Comandos separados por domínio (organizado!)
│   │   ├── admin/          # Comandos de administrador (ex: !setlider)
│   │   ├── auth/           # Login, registro, autenticação (!login, !register)
│   │   ├── economia/       # Sistema de pontos, saldo, XP (!payday, etc)
│   │   ├── jogador/        # Comandos do jogador: ver org, sair, perfil, etc
│   │   └── util/           # Comandos utilitários como !help
│   ├── handlers/
│   │   └── onMessage.js    # Função que recebe mensagens e roteia pro comando certo
│   ├── index.js            # Arquivo principal: inicia o bot, conecta, etc
│   └── services/           
│       └── exemple.js      # Services = regras do jogo, lógica de negócio (separa do comando)

├── package-lock.json       # Trava as versões das dependências (auto do npm)
├── package.json            # Scripts, dependências, configs do projeto

├── scripts/                
│   └── prisma-tools.js     # Menu interativo via terminal (migrations, seed, reset, etc)

└── seed/                   
    └── seed.js             # Roda todos os arquivos de seed (dados iniciais do jogo)
```

---

## 🧠 Comandos disponíveis

Comandos ficam em `game/commands/`, separados por tipo:

- **auth/** → Comandos de autenticação: login, registro, etc.  
  Ex: `!register`, `!login`

- **jogador/** → Comandos relacionados ao jogador e sua conta.  
  Ex: `!status`, `!inventario`

- **economia/** → Sistema de pontos, dinheiro, experiência, coleta de recompensas.  
  Ex: `!saldo`, `!comprar`, `!xp`

- **admin/** → Comandos com poderes de administrador.  
  Ex: `!ban`, `!darxp` — normalmente restritos a usuários específicos.

- **util/** → Utilitários e comandos informativos.  
  Ex: `!help`, `!ping`, comandos que não afetam diretamente o jogo.

---

## 🛠 Scripts úteis

```bash
npm run seed           # Roda todos os arquivos seed da pasta /seed
npm run studio         # Abre o Prisma Studio (visual editor do banco)
npm run prisma-tools   # Menu interativo: migrate, reset, seed, etc.
npm run game           # Inicia o bot
```

---

## ✅ Feito com

- [Node.js](https://nodejs.org)
- [Prisma](https://www.prisma.io/)
- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)
- PostgreSQL

---

## 📌 Licença

MIT © [dev-mk](https://github.com/d3v-mk)

---
