const mongoose = require('mongoose');

module.exports = async (client) => {
    try {
        await client.user.setActivity(`any messages in DM`, { type: "WATCHING" });
        await mongoose.connect(process.env.mongo, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, () => {
            console.log(`${client.user.tag} has been conencted to database.`)
        })
        console.log(`${client.user.tag} is ready!`);
    } catch (e) {
        return require('../../tools/functions/error')(e);
    }
}