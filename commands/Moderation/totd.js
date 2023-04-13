const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events,
} = require("discord.js");
const topicCountSchema = require("../../schemas/topiccount");
const topiclistSchema = require("../../schemas/topiclist");
const ms = require("ms");
const config = require("../../config.json");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("totd")
    .setDescription("Topic of the Day Controls")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setDMPermission(false)
    .addSubcommand(subcommand => subcommand
      .setName("add")
      .setDescription("Add a topic to the list")
      .addStringOption(options => options
        .setName("topic")
        .setDescription("What's your topic?")
        .setRequired(true)
        )
      )
    .addSubcommand(subcommand => subcommand
      .setName("list")
      .setDescription("Lists all upcoming debate topics.")
      )
    .addSubcommand(subcommand => subcommand
      .setName("remove")
      .setDescription("Remove a topic from the list")
      .addNumberOption(options => options
        .setName("id")
        .setDescription("What's the ID of the topic you want to remove?")
        .setRequired(true)
        )
      )
    .addSubcommand(subcommand => subcommand
      .setName('push')
      .setDescription('testing purposes only')
      ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    
    if (interaction.options.getSubcommand() === "add") {

      const topic = interaction.options.getString("topic")

      const topicCount = await topicCountSchema.find({
        _id: "64371bdfe9f18f407fa1a373"
      });
      const topicNum = topicCount[0].topiccount + 1
      await topicCountSchema.findOneAndUpdate({
        _id: "64371bdfe9f18f407fa1a373",
        topiccount: topicNum,
      });
      console.log("Topic Number Updated")

      let topicData = new topiclistSchema({
        TopicID: topicNum,
        Topic: topic,
        ChannelID: "0"
      })
      await topicData.save().catch(console.error)
      console.log("New topic saved!")

      const confirmEmbed = new EmbedBuilder()
        .setTitle("New Topic of the Day Submitted:")
        .setDescription(`ID: ${topicNum} \n${topic}`)
        .setColor("Green")
        .setFooter({text: `Made a mistake? Use /totd remove ${topicNum}, or check the list of upcoming topics with /totd list`});

      await interaction.reply({ embeds: [confirmEmbed]});
    }

    if (interaction.options.getSubcommand() === "list") {
      const currentTopic = await topicCountSchema.find({
        _id: "64371e3be9f18f407fa1a374"
      });
      const currentTopicNum = currentTopic[0].currenttopic

      let topicList = await topiclistSchema.find({})

      topicList = topicList.filter(obj => obj.TopicID > currentTopicNum)

      console.log(topicList)

    }

    if (interaction.options.getSubcommand() === "remove") {

    }

  },
};
