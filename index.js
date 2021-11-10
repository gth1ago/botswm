const fs = require('fs');
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
require('dotenv').config();

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

client.on('messageCreate', (message, interaction) => {
  const verificationChanel = '907418105175740457';
  const verificationMessage = 'concordo';
  if (message.channelId !== verificationChanel) return;

  if (message.author.bot) {
    setTimeout(() => {
      message.delete();
    }, 5000);
    return;
  }

  if (message.content === verificationMessage) {
    //ganhar o cargo
    message.channel.send('Ganhou o cargo');
    message.delete();
  } else {
    message.channel.send('Envie a mensagem certa: `concordo`');
    message.delete();
  }
  // const user = message.member;
  // await interaction.reply(`Hi, ${user}.`);
  // await interaction.followUp('Hi, <@user id>.');
  // message.channel.send(`oi, ${user}`);
  // console.log(message);
});

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
  const welcomeChannel = client.channels.cache.get('903259403170480139');
  const geral = client.channels.cache.get('903269619614253077');

  const embed = new MessageEmbed()
    .setColor('#ff6949')
    .setTitle(`${member.user.username}, seja bem-vindo(a)!`)
    .setThumbnail(member.user.displayAvatarURL())
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
      `https://i.imgur.com/gGnElW9.png`
    );

  welcomeChannel.send({ content: `${member}`, embeds: [embed] });
});

client.login(process.env.BOT_TOKEN);
