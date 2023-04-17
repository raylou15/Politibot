const {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    PermissionFlagsBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    Events,
    ModalSubmitInteraction,
    ChannelType,
    GuildScheduledEventEntityType,
    GuildScheduledEventPrivacyLevel,
    GuildScheduledEventStatus,
  } = require("discord.js");
  const ms = require("ms");
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("changemymind")
      .setDescription("PREMIUM - Create a Change My Mind debate stage to argue your stances.")
      .setDMPermission(false)
      .addSubcommand((subcommand) =>
        subcommand
          .setName("create")
          .setDescription("PREMIUM - Create a private Voice Channel for you and your friends.")
          .addStringOption(options => options
            .setName("topic")
            .setDescription("What do you want your topic to be?")
            .setRequired(true)  
          )
      ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {

      if (interaction.member.roles.cache.some(role => role.id === "775838439538425866")) {
        if (interaction.member.voice.channel) {
          const topic = interaction.options.getString("topic")
          const primaryUser = interaction.guild.members.cache.get(interaction.user.id)
  
          const newChannel = await interaction.guild.channels.create({
            name: `💬 Change My Mind: ${interaction.member.displayName}`,
            type: ChannelType.GuildStageVoice,
            parent: `928406080076255233`,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                allow: ['Connect']
              },
              {
                id: interaction.user.id,
                allow: ["Connect", "ModerateMembers", "ManageEvents"],
                deny: ["MentionEveryone"]
              }
            ]
          })
  
          primaryUser.voice.setChannel(interaction.guild.channels.cache.get((await newChannel).id))
  
          newChannel.createStageInstance({
            topic: topic,
            privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
            sendStartNotification: false
          })
  
          await interaction.reply({ content: "Change My Mind Stage created! Please note that you have stage moderator permissions.", ephemeral: true})
  
          console.log("Alright!")
  
          primaryUser.voice.setSuppressed(false)
  
        } else {
          await interaction.reply({ content: "You must be in a VC to use this command!", ephemeral: true })
        }
      } else {
        await interaction.reply({ content: "You must be a Trusted Member in order to use this command. If you think you should have this role (2 weeks and 360 messages) please <#999439440273473657>.", ephemeral: true })
      }
    },
  };
  