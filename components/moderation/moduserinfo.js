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
  name: "moduserinfo",
  description: "moduserinfo",
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
    let targetMember;
    let targetUser;
    let logData = [];
    logData = await infractionData.find({ TargetID: target1 });

    const warnCount = logData.reduce((accumulator, obj) => {
      if (obj.InfractionType === "Warning") {
        return accumulator + 1
      } else {
        return accumulator
      }
    }, 0);
    const muteCount = logData.reduce((accumulator, obj) => {
      if (obj.InfractionType === "Mute" || obj.InfractionType === "Voice Mute") {
        return accumulator + 1
      } else {
        return accumulator
      }
    }, 0);
    const kickbanCount = logData.reduce((accumulator, obj) => {
      if (obj.InfractionType === "Kick" || obj.InfractionType === "Ban") {
        return accumulator + 1
      } else {
        return accumulator
      }
    }, 0);
    const reminderCount = logData.reduce((accumulator, obj) => {
      if (obj.InfractionType === "Rule Reminder") {
        return accumulator + 1
      } else {
        return accumulator
      }
    }, 0);
    const incidentCount = logData.reduce((accumulator, obj) => {
      if (obj.InfractionType === "Incident") {
        return accumulator + 1
      } else {
        return accumulator
      }
    }, 0);

    const target = interaction.guild.members.cache.get(target1);
    console.log(target)

    if (target) {
      targetUsername = `${target.user.username.replace(/\s+/g, "_")} (${target.id})`;
      targetAvatar = target.displayAvatarURL();
      targetMember = interaction.guild.members.cache.get(target.id);
      targetUser = await targetMember.user;
    } else {
      targetUsername = `${authortext[0]} (${target1})`;
      targetAvatar = embed1.author.iconURL;
      targetMember = interaction.guild.members.cache.get(target1);
      targetUser = await targetMember.user;
    }

    const naviButtons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("moduserinfo")
        .setLabel("User Info")
        .setStyle(ButtonStyle.Primary),
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
        .setStyle(ButtonStyle.Secondary)
    );

    const accountCreated = parseInt(targetMember.user.createdTimestamp / 1000);
    const joinTime = parseInt(targetMember.joinedAt / 1000);

    const infoEmbed = new EmbedBuilder()
    .setColor("White")
    .setAuthor({ name: targetUsername, iconURL: targetAvatar })
    .setDescription(`${targetUser}`)
    .addFields(
        {
            name: `📋  Basic Information`,
            value: '‣ Username: ' + '`' + `${targetUser.username}` + '`' + '\n' + '‣ Display Name: ' + '`' + `${targetMember.displayName}` + '`' + '\n' + '‣ User ID: ' + '`' + `${targetUser.id}` + '`' + '\nㅤ'
        },
        {
            name: `📅  Join Dates`,
            value: `‣ Account Created: <t:${accountCreated}:D> | <t:${accountCreated}:R> \n‣ Account Joined: <t:${joinTime}:D> | <t:${joinTime}:R>` + '\nㅤ'
        },
        {
            name: `⚠️  Moderation Data`,
            value: `‣ Total Infractions: ` + '`' + `${logData.length}`+ '`' + `\n‣ Reminders: ` + '`' + `${reminderCount}`+ '`' + `\n‣ Incidents: ` + '`' + `${incidentCount}`+ '`' + `\n‣ Warnings: ` + '`' + `${warnCount}`+ '`' + `\n‣ Mutes: ` + '`' + `${muteCount}`+ '`' + `\n‣ Kicks/Bans: ` + '`' + `${kickbanCount}`+ '`',
            inline: true
        },
        {
            name: `🚩  Moderator Flags`,
            value: '`Currently Unavailable`',
            inline:  true
        }
    )
    .setThumbnail(targetMember.displayAvatarURL())
    .setFooter({ text: `Requested by ${interaction.user.username}` })
    .setTimestamp();

    interaction.update({ embeds: [infoEmbed], components: [naviButtons] });
  },
};
