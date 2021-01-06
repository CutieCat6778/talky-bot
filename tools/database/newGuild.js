const Guild = require('../../models/guilds');

module.exports = (_id) => {
    const obj = {
        _id: _id,
        prefix: '-'
    }
    const guild = new Guild(obj);
    guild.save().then(() => {
        return guild;
    })
}