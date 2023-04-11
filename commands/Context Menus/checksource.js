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

    if (targetMsg.content.includes("www") || targetMsg.content.includes("http") || targetMsg.content.includes(".com")) {

      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const urls = targetMsg.content.match(urlRegex);
      const url = urls[0]
      const dotComIndex = url.indexOf(".com");
      const sourceName = url.substring(url.indexOf(".") + 1, dotComIndex + 4).toLowerCase()

      const urlAS = 'https://political-bias-database.p.rapidapi.com/ASdata';
        const optionsAS = {
            method: 'GET',
            headers: {
            'X-RapidAPI-Key': '26a0987353msh7a0629e9a460e4fp1a623fjsne4eefdfd249e',
            'X-RapidAPI-Host': 'political-bias-database.p.rapidapi.com'
            }
        };
        const urlMBFC = 'https://political-bias-database.p.rapidapi.com/MBFCdata';
        const optionsMBFC = {
            method: 'GET',
            headers: {
            'X-RapidAPI-Key': '26a0987353msh7a0629e9a460e4fp1a623fjsne4eefdfd249e',
            'X-RapidAPI-Host': 'political-bias-database.p.rapidapi.com'
            }
        };

        let ASdata = [];
        let MBdata = [];

        const mediabiasEmbed = new EmbedBuilder()
        .setColor("DarkBlue")
        .setTitle(`📰  Media Bias Ratings for ${sourceName}  📰`)
        .setFooter({text: "All data courtesy of Media Bias/Fact Check and Allsides Media Bias Rating", iconURL: interaction.guild.iconURL()});

        function searchArray(array, value) {
            for (let i = 0; i < array.length; i++) {
                if (array[i].url.includes(value)) {
                    return array[i]
                }
            }
            return null;
        }


        function fetchASData() {
            return new Promise((resolve, reject) => {
                fetch(urlAS, optionsAS)
                    .then(res => res.json())
                    .then(data => {
                        ASdata = data;
                        resolve();
                    })
                    .catch(error => reject(error));
            })
        }
        function fetchMBFCData() {
            return new Promise((resolve, reject) => {
                fetch(urlMBFC, optionsMBFC)
                    .then(res => res.json())
                    .then(data => {
                        MBdata = data;
                        resolve();
                    })
                    .catch(error => reject(error));
            })
        }

        fetchASData()
        .then(() => {
            const ASResult = searchArray(ASdata, sourceName)
            console.log(ASResult)
            if (ASResult) {
                console.log("Allsides data found!")
                mediabiasEmbed.addFields(
                    {
                        name: "AllSides Media Bias Ratings:",
                        value: `Bias Rating: ${ASResult.bias} \nAgree/Disagree Vote: ${ASResult.agreement}/${ASResult.disagreement} \nRating Confidence: ${ASResult.confidence} \n[Click to go to profile](${ASResult.allsidesurl})`,
                        inline: true
                    }
                );
            } else {
                console.log("No Allsides data found.")
                mediabiasEmbed.addFields(
                    {
                        name: "AllSides Media Bias Ratings:",
                        value: "❗ No data found on Allsides. You either entered an incorrect URL, or this is an extremely obscure (and thus unreliable and unreputable) source, or it's simply not covered.",
                        inline: true
                    }
                );
            }

            fetchMBFCData()
            .then(() => {
                const MBFCResult = searchArray(MBdata, sourceName)
                console.log(MBFCResult)
                if (MBFCResult) {
                    console.log("Media Bias/Fact Check data found!")
                    console.log(MBFCResult)
                    mediabiasEmbed.addFields(
                        {
                            name: "Media Bias/Fact Check Ratings:",
                            value: `Bias Rating: ${MBFCResult.bias} \nFactuality Rating: ${MBFCResult.factual} \nCredibility: ${MBFCResult.credibility} \n[Click to go to profile](${MBFCResult.profile})`,
                            inline: true
                        }
                    );
                } else {
                    console.log("No Media Bias/Fact Check data found.")
                    mediabiasEmbed.addFields(
                        {
                            name: "Media Bias/Fact Check Ratings:",
                            value: "❗ No data found on Media Bias/Fact Check. You either entered an incorrect URL, or this is an extremely obscure (and thus unreliable and unreputable) source, or it's simply not covered.",
                            inline: true
                        }
                    );
                }

                mediabiasEmbed.addFields(
                    {
                        name: "⚠️  What does this even mean?",
                        value: "These ratings try to determine the general political leanings and credibility of news sources, and are a great metric to use for that purpose. If you're looking for more information, you're encouraged to go to the linked profiles!"
                    }
                )

                interaction.reply({ embeds: [mediabiasEmbed] })

            })
        })

    } else {
      return interaction.reply({ ephemeral: true, content: "No valid link to a source was found. Try searching manually with `/mediabiascheck`. If results show up, please open a Bot Support ticket under <#999439440273473657> and let us know." })
    }
  
  },
};
