const {
    time, ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    Embed,
  } = require("discord.js");
  const client = (module.exports = {
    data: new SlashCommandBuilder()
      .setName("userinfo")
      .setDescription("Check out a user's profile!")
      .addUserOption(options => options
        .setName("target")
        .setDescription("Who do you want to view?")
        .setRequired(true)
        ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        const targetUser = interaction.options.getUser('target')
        const targetMember = client.guilds.cache.get('760275642150420520').members.cache.get(targetUser.id)

        const accountCreated = parseInt(targetMember.user.createdTimestamp / 1000);
        const joinTime = parseInt(targetMember.joinedAt / 1000);

        const infoEmbed = new EmbedBuilder()
        .setColor("White")
        .setTitle(`👤  |  ${targetMember.displayName}`)
        .setDescription(`${targetUser}`)
        .addFields(
            {
                name: `📋  Basic Information`,
                value: '‣ Username: ' + '`' + `${targetUser.username}` + '`' + '\n' + '‣ Display Name: ' + '`' + `${targetMember.displayName}` + '`' + '\n' + '‣ User ID: ' + '`' + `${targetUser.id}` + '`' + '\nㅤ'
            },
            {
                name: `📅  Join Dates`,
                value: `‣ Account Created: <t:${accountCreated}:D> | <t:${accountCreated}:R> \n‣ Account Joined: <t:${joinTime}:D> | <t:${joinTime}:R>`
            }
        )
        .setThumbnail(targetMember.displayAvatarURL())

        interaction.reply({ embeds: [infoEmbed] })


    }
});
  