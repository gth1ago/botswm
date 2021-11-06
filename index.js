const fs = require('fs');
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS],
});
//Intents.FLAGS.GUILD_MESSAGES

client.commands = new Collection();
const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.data.name, command);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ activities: [{ name: '/help', type: 2 }] });
});
// status: 'idle', 0 = Jogando, 1 = Transmitindo, 2 = Ouvindo, 3 = Assistindo

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
});

client.on('guildMemberAdd', async (member) => {
  let channel = client.channels.cache.get('903259403170480139');

  const embed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(`${member.user.username}, seja bem-vindo(a)!`)
    // .setURL('https://discord.js.org')
    .setDescription('Some description here #geral2');

  channel.send({ content: `@${member.user.username}`, embeds: [embed] });
});

client.login(token);
