const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pollpresidential")
    .setDescription("Send a poll to the party channels.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setDMPermission(false),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {

    const libertarian = interaction.guild.channels.cache.get('775849406767431690')
    const independent = interaction.guild.channels.cache.get('775849531954298941')
    const democrats = interaction.guild.channels.cache.get('775849313195917363')
    const republicans = interaction.guild.channels.cache.get('775849355538071612')
    const green = interaction.guild.channels.cache.get('775849443294838784')
    const forward = interaction.guild.channels.cache.get('1055203199314837504')
    const solidatiry = interaction.guild.channels.cache.get('1055203257192022027')
    const constitution = interaction.guild.channels.cache.get('1055212269534986370')
    const other = interaction.guild.channels.cache.get('775849485451526144')

    const biden2024 = client.emojis.cache
      .find((emoji) => emoji.name == "biden2024")
      .toString();
    const trump2024 = client.emojis.cache
      .find((emoji) => emoji.name == "trump2024")
      .toString();
    const desantis2024 = client.emojis.cache
      .find((emoji) => emoji.name == "desantis2024")
      .toString();
    const elder2024 = client.emojis.cache
      .find((emoji) => emoji.name == "elder2024")
      .toString();
    const marianne2024 = client.emojis.cache
      .find((emoji) => emoji.name == "marianne2024")
      .toString();
    const kennedy2024 = client.emojis.cache
      .find((emoji) => emoji.name == "kennedy2024")
      .toString();
    const vivek2024 = client.emojis.cache
      .find((emoji) => emoji.name == "vivek2024")
      .toString();
    const scott2024 = client.emojis.cache
      .find((emoji) => emoji.name == "scott2024")
      .toString();
    const haley2024 = client.emojis.cache
      .find((emoji) => emoji.name == "nikkihaley2024")
      .toString();
    const asa2024 = client.emojis.cache
      .find((emoji) => emoji.name == "asa2024")
      .toString();
    const christie2024 = client.emojis.cache
      .find((emoji) => emoji.name == "christie2024")
      .toString();

    const pollEmbed = new EmbedBuilder()
    .setColor("White")
    .setTitle("Presidential Support Poll")
    .setDescription("Hey! \n\nWe're just sending out a poll to try to get to know which candidates people support. React below with the corresponding emoji that represents your favored candidate. \n\nIf you don't support any of these candidates, or aren't sure yet, react with the question mark. \n\nResults will be compiled and published within 24-48 hours. \n\nThe current candidates, in order of reaction, are: Joe Biden, Marianne Williamson, Robert F. Kennedy Jr., Donald Trump, Ron Desantis, Chris Christie, Tim Scott, Nikki Haley, Asa Hutchinson, Larry Elder, Vivek Ramaswamy")
    .setFooter({ text: "Don't forget, you can get roles to show off your preferred candidate in #roles!"});

    libertarian.send({ content: "<@&775835437901938740>", embeds: [pollEmbed] }).then(async function (message) {
      await message.react(biden2024);
      await message.react(marianne2024);
      await message.react(kennedy2024);
      await message.react(trump2024);
      await message.react(desantis2024);
      await message.react(christie2024);
      await message.react(scott2024);
      await message.react(haley2024);
      await message.react(asa2024);
      await message.react(elder2024);
      await message.react(vivek2024);
      await message.react("❓")
      return message;
    });
    independent.send({ content: "<@&775836454580125696>", embeds: [pollEmbed] }).then(async function (message) {
      await message.react(biden2024);
      await message.react(marianne2024);
      await message.react(kennedy2024);
      await message.react(trump2024);
      await message.react(desantis2024);
      await message.react(christie2024);
      await message.react(scott2024);
      await message.react(haley2024);
      await message.react(asa2024);
      await message.react(elder2024);
      await message.react(vivek2024);
      await message.react("❓")
      return message;
    });
    republicans.send({ content: "<@&775835324176662540>", embeds: [pollEmbed] }).then(async function (message) {
      await message.react(biden2024);
      await message.react(marianne2024);
      await message.react(kennedy2024);
      await message.react(trump2024);
      await message.react(desantis2024);
      await message.react(christie2024);
      await message.react(scott2024);
      await message.react(haley2024);
      await message.react(asa2024);
      await message.react(elder2024);
      await message.react(vivek2024);
      await message.react("❓")
      return message;
    });
    democrats.send({ content: "<@&775835289364725840>", embeds: [pollEmbed] }).then(async function (message) {
      await message.react(biden2024);
      await message.react(marianne2024);
      await message.react(kennedy2024);
      await message.react(trump2024);
      await message.react(desantis2024);
      await message.react(christie2024);
      await message.react(scott2024);
      await message.react(haley2024);
      await message.react(asa2024);
      await message.react(elder2024);
      await message.react(vivek2024);
      await message.react("❓")
      return message;
    });
    green.send({ content: "<@&775835409070555166>", embeds: [pollEmbed] }).then(async function (message) {
      await message.react(biden2024);
      await message.react(marianne2024);
      await message.react(kennedy2024);
      await message.react(trump2024);
      await message.react(desantis2024);
      await message.react(christie2024);
      await message.react(scott2024);
      await message.react(haley2024);
      await message.react(asa2024);
      await message.react(elder2024);
      await message.react(vivek2024);
      await message.react("❓")
      return message;
    });
    constitution.send({ content: "<@&1055211616066605106>", embeds: [pollEmbed] }).then(async function (message) {
      await message.react(biden2024);
      await message.react(marianne2024);
      await message.react(kennedy2024);
      await message.react(trump2024);
      await message.react(desantis2024);
      await message.react(christie2024);
      await message.react(scott2024);
      await message.react(haley2024);
      await message.react(asa2024);
      await message.react(elder2024);
      await message.react(vivek2024);
      await message.react("❓")
      return message;
    });
    solidatiry.send({ content: "<@&1009878785044254880>", embeds: [pollEmbed] }).then(async function (message) {
      await message.react(biden2024);
      await message.react(marianne2024);
      await message.react(kennedy2024);
      await message.react(trump2024);
      await message.react(desantis2024);
      await message.react(christie2024);
      await message.react(scott2024);
      await message.react(haley2024);
      await message.react(asa2024);
      await message.react(elder2024);
      await message.react(vivek2024);
      await message.react("❓")
      return message;
    });
    forward.send({ content: "<@&1009879930433179719>", embeds: [pollEmbed] }).then(async function (message) {
      await message.react(biden2024);
      await message.react(marianne2024);
      await message.react(kennedy2024);
      await message.react(trump2024);
      await message.react(desantis2024);
      await message.react(christie2024);
      await message.react(scott2024);
      await message.react(haley2024);
      await message.react(asa2024);
      await message.react(elder2024);
      await message.react(vivek2024);
      await message.react("❓")
      return message;
    });
    other.send({ content: "<@&775835486450090044>", embeds: [pollEmbed] }).then(async function (message) {
      await message.react(biden2024);
      await message.react(marianne2024);
      await message.react(kennedy2024);
      await message.react(trump2024);
      await message.react(desantis2024);
      await message.react(christie2024);
      await message.react(scott2024);
      await message.react(haley2024);
      await message.react(asa2024);
      await message.react(elder2024);
      await message.react(vivek2024);
      await message.react("❓")
      return message;
    });

  },
};
