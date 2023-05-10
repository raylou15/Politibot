const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  EmbedBuilder,
  ButtonComponent,
  Component,
  SelectMenuBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SelectMenuInteraction,
  ButtonInteraction,
  ComponentType,
  Embed,
} = require("discord.js");
const infractionData = require("../../schemas/infractions");
const ms = require("ms");
module.exports = {
  name: "moderationlog",
  description: "Notes",
  /**
   *
   * @param {ButtonInteraction} interaction
   */
  async execute(interaction) {
    const embed1 = interaction.message.embeds[0];

    const footertext = embed1.footer.text.split(" ");

    const authortext = embed1.author.name.replace(/[()]/g, "").split(" ");

    const target1 = authortext[1];

    let targetAvatar;
    let targetUsername;
    let logData = [];
    logData = await infractionData.find({ TargetID: target1 });

    const target = interaction.guild.members.cache.get(target1);

    if (target) {
      targetUsername = `${target.username} (${target.id})`;
      targetAvatar = target.displayAvatarURL();
    } else {
      targetUsername = `${authortext[0]} (${target1})`;
      targetAvatar = embed1.author.iconURL;
    }

    let logDataEmbed = new EmbedBuilder()
      .setAuthor({ name: targetUsername, iconURL: targetAvatar })
      .setColor("White")
      .setTitle("Moderation Log History")
      .setFooter({ text: `Requested by ${interaction.user.username}` })
      .setTimestamp();

    const naviButtons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("moderationlog")
        .setLabel("Moderation")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("notes")
        .setLabel("Incidents")
        .setStyle(ButtonStyle.Secondary)
    );

    if (!logData) {
      return interaction.reply("There are no logs to show for this user!");
    } else {
      let issuerUser;
      logData.forEach((element) => {
        issuerUser = interaction.guild.members.cache.get(element.IssuerID);
        if (element.InfractionType === "Mute") {
          logDataEmbed.addFields({
            name: `🔇 ${element.InfractionType} issued by ${issuerUser.user.username} for ${element.Duration}`,
            value: `${element.Date}\n**Reason:** ${element.Reason}\n**Case ID:** ${element.CaseID}\n━━━━━━━━━━━━━━━`,
          });
        } else if (element.InfractionType === "Warn") {
          logDataEmbed.addFields({
            name: `⚠️ ${element.InfractionType} issued by ${issuerUser.user.username}`,
            value: `${element.Date}\n**Reason:** ${element.Reason}\n**Case ID:** ${element.CaseID}\n━━━━━━━━━━━━━━━`,
          });
        } else if (element.InfractionType === "Voice Mute") {
          logDataEmbed.addFields({
            name: `🔇 ${element.InfractionType} issued by ${issuerUser.user.username}`,
            value: `${element.Date}\n**Reason:** ${element.Reason}\n**Case ID:** ${element.CaseID}\n━━━━━━━━━━━━━━━`,
          });
        } else if (element.InfractionType === "Kick") {
          logDataEmbed.addFields({
            name: `🥾 ${element.InfractionType} issued by ${issuerUser.user.username}`,
            value: `${element.Date}\n**Reason:** ${element.Reason}\n**Case ID:** ${element.CaseID}\n━━━━━━━━━━━━━━━`,
          });
        } else if (element.InfractionType === "Ban") {
          logDataEmbed.addFields({
            name: `🔨 ${element.InfractionType} issued by ${issuerUser.user.username}`,
            value: `${element.Date}\n**Reason:** ${element.Reason}\n**Case ID:** ${element.CaseID}\n━━━━━━━━━━━━━━━`,
          });
        }
      });
    }

    interaction.update({ embeds: [logDataEmbed], components: [naviButtons] });
  },
};
