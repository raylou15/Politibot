const { EmbedBuilder } = require("discord.js");
const messageCreate = require("./messageCreate");
const { execute } = require("./ready");

module.exports = {
  name: "messageReactionAdd",
  async execute(messageReaction, user) {

    const reaction = messageReaction
    console.log(reaction._emoji.name)

    if(reaction._emoji.name === "🤓" || reaction._emoji.name === "1984" || reaction._emoji.name === "SillyNerd" || reaction._emoji.name === "😎") {
        reaction.users.remove(user)
        user.send("You have been blocked from using that reaction emoji because you can't behave. Please note that if you were doing it as a sarcastic response to moderator action, you will probably face a mute if you keep trying.").catch((err) => {
            console.log(err)
        });
    }


  }
};
