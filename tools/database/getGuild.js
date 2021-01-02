const Guild = require("../../database/guilds");
module.exports = async function getGuild(id) {
    const guild = await Guild.findOne({ _id: id }).catch(e => require('./error')(e, undefined))
    if (!guild) {
        const guild = await require('./newGuild')(id);
        return guild
    }
    return guild;
}