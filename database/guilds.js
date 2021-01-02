const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    _id: String,
    channel: [{
        _id: String
    }]
})

module.exports = mongoose.model("Guilds", guildSchema); 