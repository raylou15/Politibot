const { IntegrationExpireBehavior } = require("discord.js");
const { model, Schema } = require("mongoose");

module.exports = model(
  "Topic Counter",
  new Schema({
    topiccount: Number,
  })
);
