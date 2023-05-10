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
const config = require("../../config.json");
const mediabiasAPIKey = config.mediabiasAPIKey;
const mediabiasAPIHost = config.mediabiasAPIHost;
module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("Check News Source")
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

    if (
      targetMsg.content.includes("www") ||
      targetMsg.content.includes("http") ||
      targetMsg.content.includes(".com")
    ) {
      const firstURL = targetMsg.content;
      const newUrl = firstURL.replace(/^(https?:\/\/)?(www\.)?/, "");
      const dotComIndex = newUrl.indexOf(".com");
      const sourceName = newUrl
        .substring(newUrl.indexOf("www.") + 1, dotComIndex + 4)
        .toLowerCase();

      let ASdata = [];
      let MBdata = [];
      let descData = [];

      const urlMBFC =
        "https://political-bias-database-discord-api.p.rapidapi.com/discord/MBFCdata";
      const optionsMBFC = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": `${mediabiasAPIKey}`,
          "X-RapidAPI-Host": `${mediabiasAPIHost}`,
        },
      };
      const urlAS =
        "https://political-bias-database-discord-api.p.rapidapi.com/discord/ASdata";
      const optionsAS = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": `${mediabiasAPIKey}`,
          "X-RapidAPI-Host": `${mediabiasAPIHost}`,
        },
      };

      const mediabiasEmbed = new EmbedBuilder()
        .setColor("DarkBlue")
        .setTitle(`📇  Media Political Bias Ratings`)
        .setFooter({
          text: "Credit: Allsides, Media Bias/Fact Check, and Political Bias Database (Alberto Escobar)",
          iconURL: interaction.guild.iconURL(),
        });

      descData.push(`[Ratings for www.${sourceName}](www.${sourceName})`);

      function searchArray(array, value) {
        for (let i = 0; i < array.length; i++) {
          if (array[i].url.includes(value)) {
            return array[i];
          }
        }
        return null;
      }

      function fetchASData() {
        return new Promise((resolve, reject) => {
          fetch(urlAS, optionsAS)
            .then((res) => res.json())
            .then((data) => {
              ASdata = data;
              resolve();
            })
            .catch((error) => reject(error));
        });
      }
      function fetchMBFCData() {
        return new Promise((resolve, reject) => {
          fetch(urlMBFC, optionsMBFC)
            .then((res) => res.json())
            .then((data) => {
              MBdata = data;
              resolve();
            })
            .catch((error) => reject(error));
        });
      }

      fetchASData().then(() => {
        const ASResult = searchArray(ASdata, sourceName);
        console.log(ASResult);
        if (ASResult) {
          console.log("Allsides data found!");
          descData.push(
            `\n🔹 All Sides Bias Rating: ` +
              "`" +
              ` ${ASResult.bias} bias ` +
              "`"
          );
        } else {
          console.log("No Allsides data found.");
          descData.push(`🔸 No All Sides data was found.`);
        }

        fetchMBFCData().then(() => {
          const MBFCResult = searchArray(MBdata, sourceName);
          console.log(MBFCResult);
          if (MBFCResult) {
            console.log("Media Bias/Fact Check data found!");
            console.log(MBFCResult);
            descData.push(
              `\n🔹 MB/FC Bias Rating: ` +
                "`" +
                ` ${MBFCResult.bias} bias ` +
                "`"
            );
            descData.push(
              `🔹 MB/FC Factuality Rating: ` +
                "`" +
                ` ${MBFCResult.factual} factuality ` +
                "`"
            );
            descData.push(
              `🔹 MB/FC Credibility Rating: ` +
                "`" +
                ` ${MBFCResult.credibility} ` +
                "`"
            );
          } else {
            console.log("No Media Bias/Fact Check data found.");
            descData.push(`🔸 No Media Bias/Fact Check data was found.`);
          }

          if (ASResult && MBFCResult) {
            descData.push(
              `\n👤 [All Sides Profile](${ASResult.allsidesurl})  |  [Media Bias/Fact Check Profile](${MBFCResult.profile})`
            );
            descData.push(
              `\n❓ If you're interested in learning more, go to the profiles linked above or hit "More Info" below. Also, don't call this tool not credible just because you disagree with the ratings! Learn more before you debate it!`
            );
          } else if (ASResult && !MBFCResult) {
            descData.push(`\n👤 [All Sides Profile](${ASResult.allsidesurl})`);
            descData.push(
              `\n❓ If you're interested in learning more about why there are no Media Bias/Fact Check results, hit "More Info" below. Also, don't call this tool not credible just because you disagree with the ratings! Learn more before you debate it!`
            );
          } else if (!ASResult && MBFCResult) {
            descData.push(
              `\n👤 [Media Bias/Fact Check Profile](${MBFCResult.profile})`
            );
            descData.push(
              `\n❓ If you're interested in learning more about why there are no All Sides results, hit "More Info" below. Also, don't call this tool not credible just because you disagree with the ratings! Learn more before you debate it!`
            );
          } else {
            descData.push(
              `No data was found on All Sides or Media Bias/Fact Check. Please double check your source's URL that you provided. If you input data correctly, and still do not receive any results, please click the "More Info" button below.`
            );
          }

          const buttonRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId("mediabiasInfo")
              .setLabel("❓ More Info")
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId("chromeextension")
              .setLabel("🌐 Chrome Extension")
              .setStyle(ButtonStyle.Secondary)
          );

          mediabiasEmbed.setDescription(descData.join(`\n`));

          interaction.reply({
            embeds: [mediabiasEmbed],
            components: [buttonRow],
          });
        });
      });
    } else {
      return interaction.reply({
        ephemeral: true,
        content:
          "No valid link to a source was found. Try searching manually with `/mediabiascheck`. If results show up, please open a Bot Support ticket under <#999439440273473657> and let us know.",
      });
    }
  },
};
