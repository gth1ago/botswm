const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ajuda')
    .setDescription('Sobre o bot'),
  async execute(interaction) {
    await interaction.reply(':robot: Olá! Ainda estou em construção :wrench:');
  },
};
