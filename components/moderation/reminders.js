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
  name: "reminders",
  description: "Reminders",
  /**
   *
   * @param {ButtonInteraction} interaction
   */
  async execute(interaction) {
    const embed1 = interaction.message.embeds[0];

    const footertext = embed1.footer.text.split(" ");

    const authortext = embed1.author.name.replace(/[()]/g, "").split(" ");

    console.log(authortext) 

    const target1 = authortext[1];

    let targetAvatar;
    let targetUsername;
    let logData = [];
    logData = await infractionData.find({ TargetID: target1 });

    const target = interaction.guild.members.cache.get(target1);
    console.log(target)

    if (target) {
      targetUsername = `${target.user.username.replace(/\s+/g, "_")} (${target.id})`;
      targetAvatar = target.displayAvatarURL();
    } else {
      targetUsername = `${authortext[0]} (${target1})`;
      targetAvatar = embed1.author.iconURL;
    }

    let logDataEmbed = new EmbedBuilder()
      .setAuthor({ name: targetUsername, iconURL: targetAvatar })
      .setColor("White")
      .setTitle("Rule Reminder Log History")
      .setFooter({ text: `Requested by ${interaction.user.username}` })
      .setTimestamp();

    const naviButtons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("moduserinfo")
        .setLabel("User Info")
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("moderationlog")
        .setLabel("Moderation")
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("notes")
        .setLabel("Incidents")
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("reminders")
        .setLabel("Reminders")
        .setStyle(ButtonStyle.Primary)
    );

    if (!logData) {
      return interaction.reply("There are no logs to show for this user!");
    } else {
      let issuerUser;
      logData.forEach((element) => {
        issuerUser = interaction.guild.members.cache.get(element.IssuerID);
        if (element.InfractionType === "Rule Reminder") {
          logDataEmbed.addFields({
            name: `📋 ${element.InfractionType} issued by ${issuerUser.user.username}`,
            value: `${element.Date}\n${element.Reason}\n━━━━━━━━━━━━━━━`,
          });
        }
      });
    }

    interaction.update({ embeds: [logDataEmbed], components: [naviButtons] });
  },
};
