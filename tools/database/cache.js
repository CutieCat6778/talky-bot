const Guild = require('../../models/guilds');

module.exports = async(client) => {
    let guilds = await Guild.find().catch(e => {
        return require('../functions/error')(e);
    });
    if(client.guilds.cache.size !== guilds.length){
        client.guilds.cache.map(async g => {
            await require('./getGuild')(g.id);
        })
        guilds = await Guild.find().catch(e => {
            return require('../functions/error')(e);
        });
    }
    for(let guild of guilds) {
        try{
            client.guild.set(guild._id, guild);
        }catch(e){
            return require('../functions/error')(e);
        }
    }
    return true;
}