const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const infractionData = require("../../schemas/infractions");
const ms = require("ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("logs")
    .setDescription("View logs of a given user.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setDMPermission(false)
    .addUserOption((options) =>
      options
        .setName("target")
        .setDescription("View the logs of which user?")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const target = interaction.options.getUser("target");

    let targetAvatar;
    let targetUsername;
    let logData = [];
    logData = await infractionData.find({ TargetID: target.id });

    if (target) {
      targetUsername = `${target.username.replace(/\s+/g, "_")} (${target.id})`;
      targetAvatar = target.displayAvatarURL();
    } else {
      targetUsername = `USER LEFT SERVER ${target.id}`;
      targetAvatar =
        "https://cdn.pixabay.com/photo/2013/07/12/13/50/prohibited-147408__340.png";
    }

    let logDataEmbed = new EmbedBuilder()
      .setAuthor({ name: targetUsername, iconURL: targetAvatar })
      .setColor("White")
      .setTitle("Moderation Log History")
      .setFooter({ text: `Requested by ${interaction.user.username}`})
      .setTimestamp();

      const naviButtons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("moduserinfo")
          .setLabel("User Info")
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId("moderationlog")
          .setLabel("Moderation")
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId("notes")
          .setLabel("Incidents")
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId("reminders")
          .setLabel("Reminders")
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
        // } else {
        //   logDataEmbed.addFields({
        //     name: `${element.InfractionType} issued by ${issuerUser.user.username}`,
        //     value: `${element.Date}\n**Reason:** ${element.Reason}\n**Case ID:** ${element.CaseID}\n━━━━━━━━━━━━━━━`,
        //   });
        // }
      });
      return interaction.reply({ embeds: [logDataEmbed], components: [naviButtons] });
    }
  },
};
