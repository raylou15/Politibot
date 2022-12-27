const { EmbedBuilder } = require("discord.js");
const { execute } = require("./ready");
const xp = require('simply-xp');

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.guild) {
      user = message.author;
    member = message.guild.members.cache.get(message.author.id);

    if (message.author.bot) {
      return;
    }

    // New XP System:
    xp.addXP(message, message.author.id, message.guild.id, 10)

    //Trusted Member Status

    const status = await Date.now();
    const joined = await member.joinedTimestamp;
    const datetime = status - joined;
    const userXP = xp.fetch(message.author.id, message.guild.id);

    if (
      member.roles.cache.has("909989200378601472") &&
      userXP.level >= 6 &&
      datetime >= 1209600000
    ) {
      member.roles.add("775838439538425866").then(member.roles.remove("909989200378601472")).then(message.channel.send(
        `${member.user}, congratulations! You have become a trusted member. You now have access to important permissions and channels.`
      ))
    }

    //Filtered messages

    // if (message.author.id === "268362876346040320") {
    //   message.channel.send(
    //     "Gott spoke, but he doesn't believe Ray can code a bot. So, his first amendment rights have been abolished."
    //   );
    //   message.member.timeout(5 * 1000);
    //   message.delete();
    // }

    if (message.content.toLowerCase().includes("socialism is when")) {
      message.reply("https://www.youtube.com/watch?v=rgiC8YfytDw");
    }
    if (
      message.content.toLowerCase().includes("lets go brandon") ||
      message.content.toLowerCase().includes("let's go brandon") ||
      message.content.toLowerCase().includes("lets go, brandon") ||
      message.content.toLowerCase().includes("let's go, brandon") ||
      message.content.toLowerCase().includes("les go brandon") ||
      message.content.toLowerCase().includes("less go brandon") ||
      message.content.toLowerCase().includes("let’s go brandon") ||
      message.content.toLowerCase().includes("let’s go, brandon")
    ) {
      message.reply(":clown:");
    }

    // Genocide
    if (message.content.toLowerCase().includes("genocide") ||
    message.content.toLowerCase().includes("holodomor") ||
    message.content.toLowerCase().includes("holodomr")    
    ) {
      const genocideEmbed = new EmbedBuilder()
      .setColor("White")
      .setDescription(
        `Hey! We have frequent issues with discussions about genocides in this server, especially and particularly relating to classifying certain genocides as genocides. Please keep in mind that if you violate our rules in regards to genocide denial, it *will* carry a harsher punishment. We're not going to argue over it with you, either. **Our best recommendation is to drop the subject and move on.**`
      );
    message.author.send({ embeds: [genocideEmbed] }).catch((err) => {
      message.reply({ embeds: [genocideEmbed] });
    });
    }

    // if (message.author.id === "571718818146025524") {
    //   message.react("💩")
    // }

    // Use the correct channel reminders
    // if (
    //   (await message.channel) ===
    //   (await message.guild.channels.fetch("760275642150420523"))
    // ) {
    //   if (
    //     message.content.toLowerCase().includes("lgbt") ||
    //     message.content.toLowerCase().includes("lib") ||
    //     message.content.toLowerCase().includes("conserv") ||
    //     message.content.toLowerCase().includes("communist") ||
    //     message.content.toLowerCase().includes("commie") ||
    //     message.content.toLowerCase().includes("fascist") ||
    //     message.content.toLowerCase().includes("nazi") ||
    //     message.content.toLowerCase().includes("abortion") ||
    //     message.content.toLowerCase().includes("gun") ||
    //     message.content.toLowerCase().includes("biden") ||
    //     message.content.toLowerCase().includes("trump") ||
    //     message.content.toLowerCase().includes("pelosi") ||
    //     message.content.toLowerCase().includes("democ") ||
    //     message.content.toLowerCase().includes("repub") ||
    //     message.content.toLowerCase().includes("socialis") ||
    //     message.content.toLowerCase().includes("anarch") ||
    //     message.content.toLowerCase().includes("amendment") ||
    //     message.content.toLowerCase().includes("legislation") ||
    //     message.content.toLowerCase().includes("senate") ||
    //     message.content.toLowerCase().includes("president") ||
    //     message.content.toLowerCase().includes("monarch") ||
    //     message.content.toLowerCase().includes("kamala") ||
    //     message.content.toLowerCase().includes("vice president") ||
    //     message.content.toLowerCase().includes("president") ||
    //     message.content.toLowerCase().includes("congress") ||
    //     message.content.toLowerCase().includes("congressman") ||
    //     message.content.toLowerCase().includes("senator") ||
    //     message.content.toLowerCase().includes("liber") ||
    //     message.content.toLowerCase().includes("blm") ||
    //     message.content.toLowerCase().includes("j6") ||
    //     message.content.toLowerCase().includes("scotus") ||
    //     message.content.toLowerCase().includes("supreme court") ||
    //     message.content.toLowerCase().includes("immigra") ||
    //     message.content.toLowerCase().includes("border") ||
    //     message.content.toLowerCase().includes("constitution") ||
    //     message.content.toLowerCase().includes("mtg") ||
    //     message.content.toLowerCase().includes("marjorie taylor") ||
    //     message.content.toLowerCase().includes("marj tay") ||
    //     message.content.toLowerCase().includes("obama") ||
    //     message.content.toLowerCase().includes("obamna") ||
    //     message.content.toLowerCase().includes("clinton") ||
    //     message.content.toLowerCase().includes("jimmy carter") ||
    //     message.content.toLowerCase().includes("mccarthy") ||
    //     message.content.toLowerCase().includes("scalise") ||
    //     message.content.toLowerCase().includes("gop") ||
    //     message.content.toLowerCase().includes("dnc") ||
    //     message.content.toLowerCase().includes("primaries") ||
    //     message.content.toLowerCase().includes("elected") ||
    //     message.content.toLowerCase().includes("election") ||
    //     message.content.toLowerCase().includes("runoff") ||
    //     message.content.toLowerCase().includes("marx") ||
    //     message.content.toLowerCase().includes("ballot") ||
    //     message.content.toLowerCase().includes("constitution") ||
    //     message.content.toLowerCase().includes("primaries") ||
    //     message.content.toLowerCase().includes("debate") ||
    //     message.content.toLowerCase().includes("slave") ||
    //     message.content.toLowerCase().includes("prison") ||
    //     message.content.toLowerCase().includes("brandon") ||
    //     message.content.toLowerCase().includes("walker") ||
    //     message.content.toLowerCase().includes("warnock") ||
    //     message.content.toLowerCase().includes("radical") ||
    //     message.content.toLowerCase().includes("crt") ||
    //     message.content.toLowerCase().includes("critical race theory") ||
    //     message.content.toLowerCase().includes("fauci") ||
    //     message.content.toLowerCase().includes("maga") ||
    //     message.content.toLowerCase().includes("ukraine") ||
    //     message.content.toLowerCase().includes("russia") ||
    //     message.content.toLowerCase().includes("war ")
    //   ) {
    //     const remindEmbed = new EmbedBuilder()
    //       .setColor("White")
    //       .setDescription(
    //         `Hey! A particular word in [your message](${message.url}) was flagged for potentially being related to politics. Please be sure to use **appropriate** channels with the correctly designated topic. <#760275642150420523> is NOT for politics, philosophy, or anything related.`
    //       )
    //       .setFooter({
    //         text: "Check the channel description at the top of the screen if you are confused. This is just a reminder, and it may be wrong!\n\nSpamming to try to see what catches the filter will get you muted.",
    //       });
    //     message.author.send({ embeds: [remindEmbed] }).catch((err) => {
    //       message.reply({ embeds: [remindEmbed] });
    //     });
    //   }
    // }
    }
  },
};
