const { ButtonInteraction, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const config = require("../../config.json")
const TicketCountSchema = require("../../schemas/ticketcount");
const ticketHandler = require("../../handlers/tickethandler");
const client = module.exports = {
    name: "otherhelp",
    /**
     *
     * @param {ButtonInteraction} interaction
     */
    async execute(interaction, client) {      
        const ticketsCategory = config.ticketParent
        const firstMsg = interaction.message 

        const reasonModal = new ModalBuilder()
            .setCustomId('reasons')
            .setTitle('Reason for Opening Ticket')
            .addComponents(
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder()
                        .setCustomId('reasoninput')
                        .setLabel('Reason Input')
                        .setStyle(TextInputStyle.Paragraph)
                        .setMinLength(10)
                        .setMaxLength(1024)
                        .setRequired(true)
                )
            )

        await interaction.showModal(reasonModal)

        const modalSubmitted = await interaction.awaitModalSubmit({
            time: 180000,
            filter: i => i.user.id === interaction.user.id,
        }).catch(error => {
            console.error(error)
            return interaction.message.edit({ content: "Interaction has failed. Modal likely timed out.", embeds: [], components: [] })
        })

        const submitEmbed = new EmbedBuilder()
        .setColor("Yellow")
        .setTitle('Operation Politics Modmail System')
        .setDescription('Are you sure you want to submit this ticket to the Other category?')
        .addFields([
            { name: "Category", value: "Other" },
            { name: "Reason:", value: modalSubmitted.fields.getTextInputValue('reasoninput') }
        ]);

        firstMsg.edit({ content: "Please make a confirmation below.", embeds: [], components: [] })

        const confirmdeny = modalSubmitted.reply({
            embeds: [submitEmbed],
            components: [new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('confirmticket')
                    .setLabel('Confirm')
                    .setEmoji('✔️')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('cancelticket')
                    .setLabel('Cancel')
                    .setEmoji('❌')
                    .setStyle(ButtonStyle.Danger)
            )],
            fetchReply: true
        })

        ;(await confirmdeny).awaitMessageComponent({
            time: 180000,
            filter: i => i.user.id === interaction.user.id,
        }).then(async (interaction) => {
            buttonClickValue = interaction.customId;

            if (buttonClickValue === 'cancelticket') {
                return await interaction.update({ content: "Ticket cancelled.", embeds: [], components: [] })
            }

            if (buttonClickValue === 'confirmticket') {

                const ticketCount = await TicketCountSchema.find({
                    _id: "63b9fb11264cc64866585953"
                });
                const ticketNum = ticketCount[0].TicketCount + 1
                await TicketCountSchema.findOneAndUpdate({
                    _id: "63b9fb11264cc64866585953",
                    TicketCount: ticketNum,
                });

                const ticketPreview = new EmbedBuilder()
                    .setColor('Green')
                    .setTitle('New Ticket Opened')
                    .setAuthor({ name: interaction.user.tag})
                    .setDescription(`A new ticket has been opened by ${interaction.user}`)
                    .setFields([
                        { name: "Category", value: "Other" },
                        { name: "Reason:", value: modalSubmitted.fields.getTextInputValue('reasoninput'), inline: true },
                        { name: "Claimed by:", value: "N/A", inline: true }
                    ])
                    .setFooter({ text: "Please claim the ticket before proceeding."})

                const ticketPreviewU = new EmbedBuilder()
                    .setColor('Green')
                    .setTitle('New Ticket Opened')
                    .setAuthor({ name: interaction.user.tag})
                    .setDescription(`A new ticket has been opened by ${interaction.user}`)
                    .setFields([
                        { name: "Category", value: "Other" },
                        { name: "Reason:", value: modalSubmitted.fields.getTextInputValue('reasoninput') }
                    ])

                const ticketButtons = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('claimticket')
                        .setLabel('Claim Ticket')
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId('closeticket')
                        .setLabel('Close')
                        .setStyle(ButtonStyle.Danger),
                )

                interaction.update({ content: "A new ticket has been opened! Please be patient and wait for a response from staff, or provide additional information if necessary.", embeds: [ticketPreviewU], components: [] })

                const memberDiscriminator1 = interaction.user.tag.replace("#", "-");
                const memberDiscriminator = memberDiscriminator1.replace(" ", "_");
                const ticketName = `${memberDiscriminator}-${ticketNum}`;
                const ticketCat = "other";

                ticketHandler.TicketCreate(client, ticketName, ticketCat, ticketPreview, ticketButtons)

            }

        }).catch(error => {
            console.error(error)
            return interaction.update({ content: "Interaction has failed. Prompt likely timed out.", embeds: [], components: [] })
        })

    },
  };
  
