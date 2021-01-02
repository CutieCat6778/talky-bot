const Guild = require('../../models/guilds');

module.exports = async(g) => {
    const guildData = await Guild.findOne({_id: g});
    if(guildData) return guildData;
    else if(!guildData){
        const newGuild = new Guild({
            _id: g,
            channels: [],
            prefix: "talky",
            key: "-"
        })
        await newGuild.save().catch(e => require('../functions/error')(e, undefined))
        return newGuild;
    }
}
