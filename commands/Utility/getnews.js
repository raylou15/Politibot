const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Embed,
} = require("discord.js");
const getNews = require('../../handlers/rssfeedhandler');
const url = `https://feeds.npr.org/1001/rss.xml`

const client = (module.exports = {
  data: new SlashCommandBuilder()
    .setName("getnews")
    .setDescription("Get News"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    // getNews.getNPRNews(client)
    // getNews.getPOLITICONews(client)
    getNews.getCNNNews(client)
    interaction.reply("done")
  },
});
