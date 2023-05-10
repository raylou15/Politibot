const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  Embed,
} = require("discord.js");
const client = (module.exports = {
  data: new SlashCommandBuilder()
    .setName("premiumhelp")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setDescription("Learn more about the bot and commands"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const commandEmbed = new EmbedBuilder()
      .setColor("White")
      .setTitle("Operation Politibot Premium Commands")
      .setDescription(
        `These commands are available by boosting the server or by donating via Ko-fi or with a Server Subscription. \n\n</createpoll:1055960817247457290> - Create a poll to be posted in <#760548421790203934> \n\n</customclub create:1056012168513982554> / </customclub add:1056012168513982554> / </customclub remove:1056012168513982554> - Manage your own custom club and add or remove members from it \n\n</customrole:1055725107840028692> - Create a custom role with a custom icon and color \n\n</privatevc create:1056292710987874314> / </privatevc invite:1056292710987874314> / </privatevc kick:1056292710987874314> - Make a private VC that only you can add or remove people from.`
      )
      .setFooter({ text: "━━━━━━━━━━━━━━━━━ ★ ★ ★ ★ ★ ━━━━━━━━━━━━━━━━━" });



    interaction.reply({ embeds: [commandEmbed], ephemeral: true });
  },
});
