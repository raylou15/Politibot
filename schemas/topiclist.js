const { mongoose, Schema, model } = require("mongoose");

const topiclistSchema = new Schema({
    TopicID: Number,
    Topic: String,
    ChannelID: String
});

module.exports = model("topiclistData", topiclistSchema, "topiclistData");