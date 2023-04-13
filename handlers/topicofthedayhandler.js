const config = require("../config.json");
const topicCountSchema = require("../schemas/topiccount");
const topiclistSchema = require("../schemas/topiclist");
const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
  } = require("discord.js");

async function newPost(client) {
    console.log("Posting a new Topic of the Day!")
    const currentTopic = await topicCountSchema.find({
        _id: "64371e3be9f18f407fa1a374"
      });
    const currentTopicNum = currentTopic[0].topiccount + 1
    await topicCountSchema.findOneAndUpdate(
    { _id: "64371e3be9f18f407fa1a374" },
    { topiccount: currentTopicNum }
    );
    console.log("Current Topic Updated")

    let topic = await topiclistSchema.find({ TopicID: currentTopicNum })

    const topicChannel = client.guilds.cache.get(config.guildID).channels.cache.get(config.totd);
    console.log(topicChannel.id)
    const topicEmbed = new EmbedBuilder()
    .setColor("Gold")
    .setTitle("📌  Topic of the Day")
    .setDescription(`${topic[0].Topic}`)
    .setFooter({text: "Today's Topic of the Day has been released! You can opt in or out of these pings with the Topic of the Day role."});

    const thread = await topicChannel.threads.create({
    name: topic[0].Topic,
    autoArchiveDuration: 10080,
    message: ({ content: "<@&956223433564385333>", embeds: [topicEmbed] }),
    reason: 'New Topic of the Day'
    })

    await topiclistSchema.findOneAndUpdate({ TopicID: topic[0].TopicID }, { ChannelID: thread.id })

    await thread.lastMessage.pin()
    console.log("Posted a new Topic of the Day!")
};

async function oldPost(client) {
    console.log("Posting exit poll...")
    const up = client.emojis.cache
            .find((emoji) => emoji.name == "upvote")
            .toString();
        const down = client.emojis.cache
            .find((emoji) => emoji.name == "downvote")
            .toString();
        const neut = client.emojis.cache
            .find((emoji) => emoji.name == "neutralvote")
            .toString();
    const currenttopicData = await topicCountSchema.find({
        _id: "64371e3be9f18f407fa1a374"
    });
    const currentTopicNum = currenttopicData[0].topiccount

    const topicData = await topiclistSchema.find({
        TopicID: currentTopicNum
    })

    const thread = client.guilds.cache.get(config.guildID).channels.cache.get(topicData[0].ChannelID)
    console.log(await thread)

    const exitpollEmbed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("Topic of the Day Exit Poll:")
        .setDescription(`${topicData[0].Topic} \n\n*` + up + " to upvote / " + neut + " to abstain / " + down + " to downvote*")
        .setFooter({text: "A new Topic of the Day will open soon. You can opt in or out of these pings with the Topic of the Day role. Check pinned messages to go back to the start of debate, if you want."})
    
    thread.send({ content: "<@&956223433564385333>", embeds: [exitpollEmbed] }).then(async function (message) {
        await message.react(up);
        await message.react(neut);
        await message.react(down);
    });

    await thread.setLocked(true)
    console.log("All done!")
}

module.exports = {
    newPost: newPost,
    oldPost: oldPost
}