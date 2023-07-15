const { EmbedBuilder, ChannelType, messageLink } = require("discord.js");
const ms = require('ms');
const config = require("../config.json");
const { Configuration, OpenAIApi } = require("openai");

async function checkChat(client) {
    const logs = await client.guilds.cache.get('760275642150420520').channels.cache.get('1112237072724529202')
    const politics = await client.guilds.cache.get('760275642150420520').channels.cache.get('964239900620759070')
    const totd = await client.guilds.cache.get('760275642150420520').channels.cache.get('1095809907804082320').threads.fetchActive()
    const global = await client.guilds.cache.get('760275642150420520').channels.cache.get('928407503690149939')

    let finalThread = [];
    totd.threads.forEach(thread => {
        if (!thread.locked && thread.parentId == '1095809907804082320') {
            finalThread.push(thread)
        }
    })

    const messageArrayPol = await politics.messages.fetch({ limit: 50 })
    const messageArrayToTD = await finalThread[0].messages.fetch({ limit: 50 })
    const messageArrayGlobal = await global.messages.fetch({ limit: 50 })
    let polconversationArray = [];
    let totdconversationArray = [];
    let globalconservationArray = [];

    messageArrayPol.forEach(messageObj => {
        polconversationArray.push({ "author" : `${messageObj.member.displayName}`, "content" : `${messageObj.content}` })
    });
    messageArrayToTD.forEach(messageObj => {
        totdconversationArray.push({ "author" : `${messageObj.member.displayName}`, "content" : `${messageObj.content}` })
    });

    messageArrayGlobal.forEach(messageObj => {
        globalconservationArray.push({ "author" : `${messageObj.member.displayName}`, "content" : `${messageObj.content}` })
    })

    const finalArrayPolitics = polconversationArray.reverse()
    const styledStringPolitics = `${finalArrayPolitics.map(item => `${item.author}:\n${item.content}`).join(`\n\n`)}`
    const finalArrayToTD = totdconversationArray.reverse()
    const styledStringToTD = `${finalArrayToTD.map(item => `${item.author}:\n${item.content}`).join(`\n\n`)}`
    const finalArrayGlobal = globalconservationArray.reverse()
    const styledStringGlobal = `${finalArrayGlobal.map(item => `${item.author}:\n${item.content}`).join(`\n\n`)}`

    const configuration = new Configuration({
        apiKey: config.openAIAPI,
      });

    const openai = new OpenAIApi(configuration);

    try {
    const responsePolitics = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        max_tokens: 500,
        messages: [
            { role: 'system', content: `You are Operation Politibot, a discord bot designed to moderate the Operation Politics community and scan messages for bad faith content, logical fallacies, disrespectful behavior, bigotry, and political extremism and violence during debates and discussions. Answer extremely concisely.`},
            { role: 'user', content: `I have provided a conversation from a text channel below. Please examine this conversation for any bad faith content, logical fallacies, disrespectful behavior, bigotry, or political extremism and violence. Please provide exact quotes and briefly identify any violations you may find, but do not describe the topic of the conversation. \n\n${styledStringPolitics}` }
        ]
    });
    const responseTOTD = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        max_tokens: 500,
        messages: [
            { role: 'system', content: `You are Operation Politibot, a discord bot designed to moderate the Operation Politics community and scan messages for bad faith content, logical fallacies, disrespectful behavior, bigotry, and political extremism and violence during debates and discussions. Answer extremely concisely.`},
            { role: 'user', content: `I have provided a conversation from a text channel below. Please examine this conversation for any bad faith content, logical fallacies, disrespectful behavior, bigotry, or political extremism and violence. Please provide exact quotes and briefly identify any violations you may find, but do not describe the topic of the conversation. \n\n${styledStringToTD}` }
        ]
    });
    const responseGlobal = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        max_tokens: 500,
        messages: [
            { role: 'system', content: `You are Operation Politibot, a discord bot designed to moderate the Operation Politics community and scan messages for bad faith content, logical fallacies, disrespectful behavior, bigotry, and political extremism and violence during debates and discussions. Answer extremely concisely.`},
            { role: 'user', content: `I have provided a conversation from a text channel below. Please examine this conversation for any bad faith content, logical fallacies, disrespectful behavior, bigotry, or political extremism and violence. Please provide exact quotes and briefly identify any violations you may find, but do not describe the topic of the conversation. \n\n${styledStringGlobal}` }
        ]
    });


    logs.send(`${politics.url}: ` + responsePolitics.data.choices[0].message.content + `\n\nLast Messages: \n${await politics.lastMessage.url}`)
    logs.send(`${finalThread[0].url}: ` + responseTOTD.data.choices[0].message.content + `\n\nLast Messages: \n${await finalThread[0].lastMessage.url}`)
    logs.send(`${global.url}: ` + responseGlobal.data.choices[0].message.content + `\n\nLast Messages: \n${await global.lastMessage.url}`)

    } catch (err) {
    console.log(`Error: ` + err);
    return err;
    }

}

module.exports = {
    checkChat : checkChat
}