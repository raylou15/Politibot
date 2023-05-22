const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const messageCreate = require("./messageCreate");
const { execute } = require("./ready");

module.exports = {
  name: "messageReactionAdd",
  async execute(messageReaction, user) {

    const reaction = messageReaction

    if(reaction._emoji.name === "🤓" || reaction._emoji.name === "1984" || reaction._emoji.name === "SillyNerd" || reaction._emoji.name === "😎") {
        reaction.users.remove(user)
        user.send("You have been blocked from using that reaction emoji because you can't behave. Please note that if you were doing it as a sarcastic response to moderator action, you will probably face a mute if you keep trying.").catch((err) => {
            console.log(err)
        });
    }

    if (reaction._emoji.id === "925972736742948865" && reaction.count === 10) {
      const hallofshameEmbed = new EmbedBuilder()
      .setColor("DarkButNotBlack")
      .setAuthor({ iconURL: reaction.message.author.displayAvatarURL(), name: reaction.message.member.displayName })
      .setDescription(`${reaction.message.content} \n\n[Jump to message](${reaction.message.url})`)
      .setTimestamp(reaction.message.createdTimestamp)

      // const hallofshameButtons = new ActionRowBuilder().addComponents(
      //   new ButtonBuilder()
      //   .setCustomId("approvehallofshame")
      //   .setLabel("✅")
      //   .setStyle(ButtonStyle.Success),
      //   new ButtonBuilder()
      //   .setCustomId("rejecthallofshame")
      //   .setLabel("❌")
      //   .setStyle(ButtonStyle.Danger)
      // )

      // const approveChannel = reaction.message.guild.channels.cache.get("775494762216161341")
      // await approveChannel.send({ embeds: [hallofshameEmbed], components: [hallofshameButtons] })

      const hallofshame = reaction.message.guild.channels.cache.get("1018396794834661508")
      await hallofshame.send({ embeds: [hallofshameEmbed] })

    }




  }
};
