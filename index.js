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
  client.user.setPresence({ activities: [{ name: '/ajuda', type: 2 }] });
});

// client.on('messageCreate', (message) => {
//   const { guildId } = require('./config.json');

//   const verificationChanel = '844358432428523541';

//   if (message.channelId !== verificationChanel) return;

//   if (message.author.bot) {
//     setTimeout(() => {
//       message.delete();
//     }, 5000);
//     return;
//   }

//   const studantRole = guildId.roles.cache.find((r) => r.name === 'Estudante');
//   const verificationMessage = 'concordo';

//   if (message.content === verificationMessage) {
//     message.member.roles.add(studantRole);
//     message.delete();
//   } else {
//     message.delete();
//     message.channel.send('Por favor, envie a mensagem certa: `concordo`');
//   }
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
      content: 'Ocorreu um erro ao exeutar este comando!',
      ephemeral: true,
    });
  }
});

client.on('guildMemberAdd', async (member) => {
  const welcomeChannel = client.channels.cache.get('844354691566665730');
  const rulesChannel = client.channels.cache.get('844358432428523541');
  const presentationChannel = client.channels.cache.get('866118739498106901');

  const embed = new MessageEmbed()
    .setColor('#ff6949')
    .setTitle(`${member.user.username}, seja bem-vindo(a)!`)
    .setThumbnail(member.user.displayAvatarURL())
    .addFields(
      {
        name: 'Como começar?',
        value: `Leia nossas ${rulesChannel}`,
      },
      // { name: '\u200B', value: '\u200B' },
      {
        name: 'Apresentação!',
        value: `Sinta-se livre para contar um pouco sobre você para a gente em ${presentationChannel}`,
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
