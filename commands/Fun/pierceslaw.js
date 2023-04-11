const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, Embed, } = require("discord.js");
const fetch = require("node-fetch")
const client = (module.exports = {
data: new SlashCommandBuilder()
    .setName("pierceslaw")
    .setDescription("Pierce's Law of Operation Politics Discussions"),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        .setColor("White")
        .setTitle("Pierce's Law of Operation Politics Discussions")
        .setDescription("As discussion about literally anything in Operation Politics grows longer, the probability of it turning into a LGBT topic increases.")
  
        interaction.reply({
        embeds: [embed]
        });
    },
  });
  