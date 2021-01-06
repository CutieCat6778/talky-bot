const Guild = require('../../models/guilds');

module.exports = async (_id) => {
    let guild = await Guild.findOne({_id: _id}).catch(e => {
        return require('../functions/error')(e);
    })
    if(!guild) guild = await require('./newGuild')(_id);
    if(!guild) return undefined;
    else if(guild){
        return guild;
    }
}