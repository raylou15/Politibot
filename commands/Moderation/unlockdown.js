const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unlockdown")
    .setDescription("Unlocks a bunch of channels.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setDMPermission(false),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {

    const lockEmbed = new EmbedBuilder()
    .setColor("DarkGreen")
    .setTitle("🚨  Lockdown Lifted")
    .setDescription("This channel has been unlocked. Please behave, stay civil, and keep in mind our <#775838975755681842> when discussing and debating.")

    const discCat = await interaction.guild.channels.fetch(
      "760275642150420521"
    );
    const commCat = await interaction.guild.channels.fetch(
      "775559863522164737"
    );

    await discCat.permissionOverwrites.create(discCat.guild.roles.everyone, {
      SendMessages: null,
    });
    await commCat.permissionOverwrites.create(commCat.guild.roles.everyone, {
      SendMessages: null,
    });

    discCat.children.cache.forEach(channel => {
      if (channel.id !== "1018396794834661508" && channel.id !== "965271666684985454" && channel.id !== "760548421790203934") {
        channel.send({ embeds: [lockEmbed] })
      }
    })
    commCat.children.cache.forEach(channel => {
      if (channel.id !== "1018396794834661508" && channel.id !== "965271666684985454" && channel.id !== "760548421790203934") {
        channel.send({ embeds: [lockEmbed] })
      }
    })

    interaction.reply({ content: "Unlockdown successful!", ephemeral: true });
  },
};
