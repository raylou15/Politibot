const { EmbedBuilder, ChannelType } = require("discord.js");
const { execute } = require("./ready");
const xp = require("simply-xp");
const ms = require('ms');
const fs = require('fs');
const path = require('path');
const natural = require('natural');
const config = require("../../config.json");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.guild) {
      user = message.author;
      member = message.guild.members.cache.get(message.author.id);

      //News
      if (message.channel.type === ChannelType.GuildAnnouncement) {
        message.crosspost().catch(console.error);
      }

      if (message.author.bot) {
        return;
      }

      const up = client.emojis.cache
        .find((emoji) => emoji.name == "upvote")
        .toString();
      const down = client.emojis.cache
        .find((emoji) => emoji.name == "downvote")
        .toString();
      const neut = client.emojis.cache
        .find((emoji) => emoji.name == "neutralvote")
        .toString();

      if (message.channel.id === "927365081371652137") {
        await message.react(up);
        await message.react(neut);
        await message.react(down);
      }

      // New XP System:
      xp.addXP(message, message.author.id, message.guild.id, 10);

      //Trusted Member Status

      const status = Date.now();
      const joined = await member.joinedTimestamp;
      const datetime = status - joined;
      const userXP = xp.fetch(message.author.id, message.guild.id);

      if (
        member.roles.cache.has("909989200378601472") &&
        (await userXP.level) >= 6 &&
        datetime >= 1209600000
      ) {
        member.roles
          .add("775838439538425866")
          .then(member.roles.remove("909989200378601472"))
          .then(
            message.channel.send(
              `${member.user}, congratulations! You have become a trusted member. You now have access to important permissions and channels.`
            )
          );
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
        message.content.toLowerCase().includes("sounds like commie") ||
        message.content.toLowerCase().includes("sounds like some commie") ||
        message.content.toLowerCase().includes("commie") ||
        message.content.toLowerCase().includes("proletariat") ||
        message.content.toLowerCase().includes("wagie") ||
        message.content.toLowerCase().includes("bourgeoisie")
      ) {
        message.reply(
          "https://cdn.discordapp.com/attachments/928407503690149939/1062530628257583104/commie.mp4"
        );
      }
      if (
        message.content.toLowerCase().includes("lets go brandon") ||
        message.content.toLowerCase().includes("let's go brandon") ||
        message.content.toLowerCase().includes("lets go, brandon") ||
        message.content.toLowerCase().includes("let's go, brandon") ||
        message.content.toLowerCase().includes("les go brandon") ||
        message.content.toLowerCase().includes("less go brandon") ||
        message.content.toLowerCase().includes("let’s go brandon") ||
        message.content.toLowerCase().includes("let’s go, brandon") ||
        // message.content.toLowerCase().includes("trans bathrooms") ||
        // message.content.toLowerCase().includes("trans athlete") ||
        // message.content.toLowerCase().includes("trans people") ||
        // message.content.toLowerCase().includes("transsexual") ||
        // message.content.toLowerCase().includes("trans gender") ||
        // message.content.toLowerCase().includes("transgender") ||
        // message.content.toLowerCase().includes("trans-gender") ||
        // message.content.toLowerCase().includes("trans-sexual") ||
        // message.content.toLowerCase().includes("tran-sexual") ||
        // message.content.toLowerCase().includes("gender") ||
        // message.content.toLowerCase().includes("breast augmentation") ||
        // message.content.toLowerCase().includes("pedo") ||
        // message.content.toLowerCase().includes("hormone") ||
        // message.content.toLowerCase().includes("blocker") ||
        // message.content.toLowerCase().includes("puberty") ||
        message.content.toLowerCase().includes("genital")  
      ) {
        message.reply(":clown:");
      }

      // Genocide
      if (
        message.content.toLowerCase().includes("genocide") ||
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

      // Logging messages
      // let messages = [];

      // function addLog(messageObj, messageAuthor) {
      //   messages.push(messageObj.content);

      //   const filePath = path.join(__dirname, 'messagelogs', `${messageAuthor}.json`)

      //   fs.writeFile(filePath, JSON.stringify(messages), (err) => {
      //     if (err) throw err;
      //     console.log('Message added and saved to file!')
      //   });
      // }

      // function readJSONFile(filePath, callback) {
      //   fs.readFile(filePath, 'utf-8', (err, data) => {
      //     if (err) {
      //       addLog(message, message.author.id)
      //       return;
      //     }

      //     try {
      //       const obj = JSON.parse(data);
      //       callback(null, obj);
      //     } catch (err) {
      //       addLog(message, message.author.id);
      //     }
      //   });
      // }

      // function writeJSONFile(filePath, obj, callback) {
      //   fs.writeFile(filePath, JSON.stringify(obj), callback);
      // }

      // function addStringsToFile(filePath, newStrings) {
      //   readJSONFile(filePath, (err, data) => {
      //     if (err) throw err;

      //     data.push(...newStrings);

      //     writeJSONFile(filePath, data, (err) => {
      //       if (err) throw err;
      //       console.log("New message data added to the file!")
      //     });
      //   });
      // }

      // if (message.content.length > 10) {
      //   const filePath = path.join(__dirname, 'messagelogs', `${message.author.id}.json`)
      //   const newStrings = [`${message.content}`]
      //   addStringsToFile(filePath, newStrings)
      // }

    }
  },
};
