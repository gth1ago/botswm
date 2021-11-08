const fs = require('fs');
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
require('dotenv').config();
// const { token } = require('./config.json');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
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

// client.on('messageCreate', (message) => {
//   // if(message.author.bot)
//   const user = message.member;
//   // await interaction.reply(`Hi, ${user}.`);
//   // await interaction.followUp('Hi, <@user id>.');
//   message.channel.send(`oi, ${user}`);
//   console.log(message);
// });

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
  let geral = client.channels.cache.get('903269619614253077');

  const embed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(`${member.user.username}, seja bem-vindo(a)!`)
    // .setDescription('Some description here #geral2')
    .setThumbnail('https://i.imgur.com/AfFp7pu.png')
    .addFields(
      {
        name: 'Precisando de ajuda?',
        value: `Leia sobre o servidor em #sobre-o-servidor e #avisos, ou nos envie mensagem em #ajude-me ||| ${geral}`,
      },
      // { name: '\u200B', value: '\u200B' },
      {
        name: 'Evite punições!',
        value: 'Leia as nossas #regras para evitar ser punido no servidor!',
      },
      {
        name: 'Apresentação!',
        value: 'Apresente-se em #apresentação para conhecermos você',
      }
    )
    .setTimestamp()
    .setFooter(
      'Study With Me - UEM • © Todos os direitos reservados.',
      'https://i.imgur.com/AfFp7pu.png'
    );

  channel.send({ content: `${member}`, embeds: [embed] });
});

client.login(process.env.BOT_TOKEN);
