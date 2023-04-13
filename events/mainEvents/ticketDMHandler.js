const { EmbedBuilder, ChannelType } = require("discord.js");
const { execute } = require("../mainEvents/ready");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    const ticketsChannel = client.channels.cache.get("1053882820684169266");
    const server = client.guilds.cache.get("760275642150420520");
    const user = message.author
    if (!message.guild) {
        if (!message.author.bot) {
            const memberDiscriminator1 = user.tag.replace("#", "-")
            const memberDiscriminator = memberDiscriminator1.replace(" ", "_")
            const discrimLength = memberDiscriminator.length

            ticketsArray = [];
            if (ticketsChannel.threads.cache.find(x => x.name.substring(0, discrimLength) === memberDiscriminator)) { // Found an active thread.
                ticketsChannel.threads.cache.forEach(element => {
                    if (element.name.substring(0, discrimLength) === memberDiscriminator) {
                            ticketsArray.push(element)
                    }
                })

                console.log(ticketsArray[ticketsArray.length - 1])
                if (ticketsArray[ticketsArray.length - 1].archived === false) { // Active thread found!
                    const currentChannel = ticketsArray[ticketsArray.length - 1]
                    const msgEmbed = new EmbedBuilder()
                    .setColor("Green")
                    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                    .setDescription(message.content)
                    .setFooter({ text: message.author.id })
                    .setTimestamp();

                    currentChannel.send({ embeds: [msgEmbed] })
                    message.react('<:tickmark:965445812123500665>')

                } else { // No tickets found
                    
                    const openPrompt = new EmbedBuilder()
                    .setColor("Yellow")
                    .setTitle("Operation Politics Modmail System")
                    .setDescription("No open tickets were found. Our bot only accepts DMs if you are trying to open a ticket. In order to do this and to clarify your intent to contact Staff, please use the `/openticket` command.")
                    .setFooter({ text: "If this was a mistake, please ignore." })
                    .setTimestamp();

                    message.reply({ embeds: [openPrompt]})

                }
            } else { // There are no active threads!
                const openPrompt = new EmbedBuilder()
                .setColor("Yellow")
                .setTitle("Operation Politics Modmail System")
                .setDescription("No open tickets were found. Our bot only accepts DMs if you are trying to open a ticket. In order to do this and to clarify your intent to contact Staff, please use the `/openticket` command.")
                .setFooter({ text: "If this was a mistake, please ignore." })
                .setTimestamp();

                message.reply({ embeds: [openPrompt]})

            }
        } else return
    }  else if (message.channel.parent === ticketsChannel && !message.author.bot) { // Reply functionality.
        const nameArgs = message.channel.name.split("-")
        const targetDiscrim1 = `${nameArgs[0]}#${nameArgs[1]}`
        const targetDiscrim = targetDiscrim1.replace("_", " ")
        const targetUser = client.users.cache.find(u => u.tag === targetDiscrim)

        let staffID = message.author.id.slice(-5) // Setting up aliases for staff.

        const tagID = message.channel.appliedTags[0]
        const tagArray = [];
        message.channel.parent.availableTags.forEach(element => {
            if (element.id === tagID) {
                tagArray.push(element)
            }
        })
        let chosenTag;
        if (tagArray[0]) {
            chosenTag = tagArray[0]
        } else {
            chosenTag = "Other"
        }
       
        const msgEmbed = new EmbedBuilder()
        .setColor("Green")
        .setAuthor({ name: "Operation Politics Staff Response", iconURL: message.guild.iconURL() })
        .setDescription(`**Response:** ${message.content}`)
        .setFooter({ text: `Ticket: ${message.channel.name} • Staff ID: ${staffID}` })
        .setTimestamp();

        targetUser.send({ embeds: [msgEmbed] }).catch(async (err) => {
            console.log(err);
            message.react('<:crossmark:965445798630416434>')
            return logChannel.send({
                content:
                "I couldn't DM this user since they do not accept DMs from server bots/members. It's recommended that you close this ticket now.",
            });
        });

        message.react('<:tickmark:965445812123500665>')

    } else return
  },
};
