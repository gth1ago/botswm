const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Replies with Help!'),
  async execute(interaction) {
    await interaction.reply('Se vira, meu chapa! :face_with_spiral_eyes:');
  },
};
