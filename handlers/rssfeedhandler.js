const Parser = require('rss-parser');
const parser = new Parser()
const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    time,
} = require("discord.js");
const { content } = require('googleapis/build/src/apis/content');
const postButtons = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
    .setCustomId('poststory')
    .setLabel('Post')
    .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
    .setCustomId('dismissstory')
    .setLabel('Dismiss')
    .setStyle(ButtonStyle.Danger),
)

async function getNPRNews(client) {
    const sendChannel = client.guilds.cache.get('760275642150420520').channels.cache.get("775494762216161341")
    const url = `https://feeds.npr.org/1001/rss.xml`
    try {
        const feed = await parser.parseURL(url);

        feed.items.forEach(item => {
            sendChannel.send({ embeds: [
                new EmbedBuilder()
                .setColor("DarkButNotBlack")
                .setTitle(item.title)
                .setURL(item.link)
                .setDescription(item.contentSnippet)
                .setFooter({ iconURL: feed.image.url, text: "NPR News"})
            ], components: [postButtons] })
        })
    } catch (error) {
        console.error(`Error parsing RSS feed: ${url}`, error)
    }
}

async function getPOLITICONews(client) {
    const sendChannel = client.guilds.cache.get('760275642150420520').channels.cache.get("775494762216161341")
    const url = `https://rss.politico.com/politics-news.xml`
    try {
        const feed = await parser.parseURL(url)

        feed.items.forEach(item => {
            sendChannel.send({ embeds: [
                new EmbedBuilder()
                .setColor("DarkButNotBlack")
                .setTitle(item.title)
                .setURL(item.link)
                .setImage(item.content._url)
                .setDescription(item.contentSnippet)
                .setFooter({ iconURL: `https://www.politicon.com/wp-content/uploads/2017/06/POLITCOLOGO.SQUARE-01.jpg`, text: "POLITICO"})
            ], components: [postButtons] })
        })
    } catch (error) {
        console.error(`Error parsing RSS feed: ${url}`, error)
    }
}

async function getCNNNews(client) {
    const sendChannel = client.guilds.cache.get('760275642150420520').channels.cache.get("775494762216161341")
    const url = `http://rss.cnn.com/rss/cnn_allpolitics.rss`
    try {
        const feed = await parser.parseURL(url)

        feed.items.forEach(item => {
            sendChannel.send({ embeds: [
                new EmbedBuilder()
                .setColor("DarkButNotBlack")
                .setTitle(item.title)
                .setURL(item.link)
                .setImage(item.content._url)
                .setDescription(item.contentSnippet)
                .setFooter({ iconURL: `https://www.freepnglogos.com/uploads/cnn-logo-circle-icon-png-12.png`, text: "CNN"})
            ], components: [postButtons] })
        })
    } catch (error) {
        console.error(`Error parsing RSS feed: ${url}`, error)
    }
}

module.exports = {
    getNPRNews: getNPRNews,
    getPOLITICONews: getPOLITICONews,
    getCNNNews: getCNNNews
}