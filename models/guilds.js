const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    _id: String,
    prefix: String,
    channels: [{
        '_id': String
    }]
})

module.exports = mongoose.model("Guilds", guildSchema); 