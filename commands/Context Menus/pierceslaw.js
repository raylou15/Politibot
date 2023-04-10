const {
  SlashCommandBuilder,
  ContextMenuCommandInteraction,
  PermissionFlagsBits,
  EmbedBuilder,
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  Embed,
  ComponentType,
} = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("Pierce's Law")
    .setType(ApplicationCommandType.Message)
    .setDMPermission(false),
  /**
   *
   * @param {ContextMenuCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const targetMsg = await interaction.channel.messages.fetch(
      interaction.targetId
    );

    const embed = new EmbedBuilder()
      .setColor("White")
      .setTitle("Pierce's Law of Operation Politics Discussions")
      .setDescription("As discussion about literally anything in Operation Politics grows longer, the probability of it turning into a LGBT topic increases.")

    interaction.reply({
      embeds: [embed]
    });
  },
};
