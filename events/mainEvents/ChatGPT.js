// const { EmbedBuilder, ChannelType } = require("discord.js");
// const { execute } = require("./ready");
// const ms = require('ms');
// const config = require("../../config.json");
// const { Configuration, OpenAIApi } = require("openai")

// module.exports = {
//   name: "messageCreate",
//   async execute(message, client) {
//     if (message.guild) {
//       user = message.author;
//       member = message.guild.members.cache.get(message.author.id);

//       if (message.channel.id === '775494762216161341') {
//         const content = message.content;

//         if (message.author.bot) {
//           return
//         }

//         const messageArray = await message.channel.messages.fetch({ limit: 20 })

//         let conversationArray = [];

//         messageArray.forEach(messageObj => {
//           if (messageObj.mentions.repliedUser) {
//             let memberID = messageObj.mentions.repliedUser.id
//             let repliedMemberName = message.guild.members.cache.get(`${memberID}`).displayName
//             conversationArray.push({ "author" : `${messageObj.member.displayName}`, "repliedTo" : `${repliedMemberName}`, "content" : `${messageObj.content}`})
//           } else if (!messageObj.mentions.repliedUser) {
//             conversationArray.push({ "author" : `${messageObj.member.displayName}`, "content" : `${messageObj.content}` })
//           }
//         })

//         const reversedArray = conversationArray.reverse()
//         const styledString = `${reversedArray.map(item => `${item.author}:\n${item.content}`).join(`\n\n`)}`

//         const configuration = new Configuration({
//           apiKey: config.openAIAPI,
//         });

//         const openai = new OpenAIApi(configuration);

//         try {
//           const response = await openai.createChatCompletion({
//             model: 'gpt-3.5-turbo',
//             temperature: 0.4,
//             max_tokens: 500,
//             messages: [{ role: 'user', content: `If the content below is a debate about something relating to politics, identify whether or not there are any bad faith arguments presented by each participant, and whether or not they committed a logical fallacy. If there is no political debate, please just say "no issues" and nothing else. \n\n${styledString}` }]
//           });

//           message.reply(response.data.choices[0].message.content)

//         } catch (err) {
//           console.log(`Error: ` + err);
//           return err;
//         }





//         // try {
//         //   const response = await fetch(MODEL_ENDPOINT, {
//         //     method: 'POST',
//         //     headers: {
//         //       'Authorization' : `Bearer ${openAIKey}`,
//         //       'Content-Type' : `application/json`,
//         //     },
//         //     body: JSON.stringify({
//         //       prompt: `If the content below is a debate about something relating to politics, identify whether or not there are any bad faith arguments presented by each participant, and whether or not they committed a logical fallacy. If there is no political debate, please just say "corndog!". \n\n${styledString}`,
//         //       max_tokens: 1000,
//         //       temperature: 0.4,
//         //       model: `gpt-3.5-turbo`
//         //     })
//         //   })

//         //   if (response.ok) {
//         //     const data = await response.json()
//         //     const completion = data.choices[0].text.trim();
//         //     message.channel.send(completion)
//         //   } else {
//         //     console.error(`API request failed:`, response.status, response.statusText)
//         //   }

//         // } catch (error) {
//         //   console.error('An error with ChatGPT occurred:', error)
//         // }

//       }

//     }
//   },
// };
