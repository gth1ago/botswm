# 🤖 Study wih me - Bot

Bot da comunidade, criado para automatizar mensagens de boas-vindas e comandos customizados.

---

## 🚀 Como rodar localmente

### 1. Clone o repositório

```bash
git clone <github-botswm>
cd botswm
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o ambiente

Crie um arquivo `.env` com o token do seu bot:

```env
BOT_TOKEN=seu_token_aqui
```

Edite o arquivo `config.json` com o `clientId` do seu bot e o `guildId` do seu servidor:

```json
{
  "clientId": "SEU_CLIENT_ID",
  "guildId": "SEU_GUILD_ID"
}
```

> 💡 **Dica:** Você encontra o `clientId` na página do bot no [Discord Developer Portal](https://discord.com/developers/applications), e o `guildId` clicando com o botão direito no servidor (com o modo de desenvolvedor ativado).

### 4. Execute o bot

```bash
node index.js
```

---

## ☁️ Deploy (Heroku, Railway, etc.)

Certifique-se de ter um arquivo `Procfile` com o conteúdo abaixo:

```
worker: node index.js
```

E configure a variável de ambiente `BOT_TOKEN` na plataforma que estiver usando para deploy.

---

## 📁 Estrutura do projeto

```
.
├── commands/             # Comandos Slash personalizados
├── index.js              # Script principal do bot
├── config.json           # Configurações de IDs do bot/servidor
├── .env                  # Token do bot (NÃO versionar)
├── .gitignore
├── package.json
├── package-lock.json
├── Procfile              # Arquivo de inicialização para deploy
└── README.md             # Este arquivo :)
```

---

## ⚙️ Permissões e Intents

Ative as **Privileged Gateway Intents** no painel do bot:

- ✅ Server Members Intent
- ✅ Presence Intent (se precisar)
- ✅ Message Content Intent (opcional)

---

## 🧠 Funcionalidades básicas

- Mensagem de boas-vindas automática no canal definido
- Embed personalizado com canais úteis e regras

---

## ❗️Importante

- O `.env` deve **NUNCA** ser versionado — ele está no `.gitignore`.
- Se a imagem do rodapé estiver local, hospede-a e use a URL pública.

---

## 💬 Dúvidas

Se precisar de ajuda, abra uma *issue* aqui no repositório ou entre em contato
