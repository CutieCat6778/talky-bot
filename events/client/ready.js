const mongoose = require('mongoose');

module.exports = async (client) => {
    try {
        await client.user.setActivity(`Starting up`, {type: "PLAYING"});
        await mongoose.connect(process.env.mongo, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, () => {
            console.log(`${client.user.tag} has been conencted to database.`)
        })
        await require('../../tools/database/cache.js')(client);
        console.log(`${client.user.tag} is ready!`);
        setTimeout(async() => {
            client.startUp = true;
            await client.user.setActivity(`DM or @Talky`, {type: "WATCHING"});
        }, 10000)
    } catch (e) {
        return require('../../tools/functions/error')(e);
    }
}