const { Client, Intents } = require('discord.js');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const config = require('./config.json');

client.on('ready', () => {
  console.log(`Bot foi iniciado, com ${client.user.tag} .`);
});

client.login(config.token);
