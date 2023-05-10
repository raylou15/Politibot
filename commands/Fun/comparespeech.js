const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Embed,
} = require("discord.js");
const natural = require(`natural`);
const fs = require("fs");
const path = require('path');
const config = require("../../config.json");
const { error } = require("console");
const client = (module.exports = {
  data: new SlashCommandBuilder()
    .setName("comparespeech")
    .setDescription("Find out how similar the grammar of two people are.")
    .addUserOption((options) =>
      options
        .setName("person_a")
        .setDescription("Who is the first user?")
        .setRequired(true)
    )
    .addUserOption((options) =>
      options
        .setName("person_b")
        .setDescription("Who is the second user?")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const user1 = interaction.options.getUser("person_a");
    const user2 = interaction.options.getUser("person_b");

    const filePath1 = path.join(
      __dirname,
      "..",
      "..",
      "events",
      "mainEvents",
      "messagelogs",
      `${user1.id}.json`
    );
    const filePath2 = path.join(
      __dirname,
      "..",
      "..",
      "events",
      "mainEvents",
      "messagelogs",
      `${user2.id}.json`
    );

    fs.readFile(filePath1, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const fileContents1 = JSON.parse(data)
        fs.readFile(filePath2, 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            const fileContents2 = JSON.parse(data)


            // Actually do the thing!
            const tokenizer = new natural.WordTokenizer();
            const stemmer = natural.PorterStemmer;

            const lexiconPath = path.join(__dirname, '..', '..', 'node_modules/natural/lib/natural/brill_pos_tagger/data/English');
            const pos = new natural.BrillPOSTagger(null, lexiconPath, true);

            const taggedMessages1 = fileContents1.map((msg) => pos.tag(tokenizer.tokenize(msg)));
            const taggedMessages2 = fileContents2.map((msg) => pos.tag(tokenizer.tokenize(msg)));

            const ngramSize = 2;
            const featureExtractor = new natural.NGrams(ngramSize);
            const features1 = featureExtractor.getNGrams(taggedMessages1);
            const features2 = featureExtractor.getNGrams(taggedMessages2);

            const index = natural.JaccardIndexDistance(features1, features2);

            interaction.reply(`${index}`)

        })

    })
  },
});
