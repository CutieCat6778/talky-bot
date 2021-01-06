module.exports = async (message, client) => {
    let limit;
    limit = client.limit.get(message.author.id);
    if (limit) {
        if (client.uptime - limit.time < 6000) {
            return message.channel.send(`Slowdown, bro. Just wait ${require('ms')(6000 - (client.uptime - limit.time), { long: true })}.`).then(m => {
                m.delete({timeout: 5000});
            })
        }
    }
    if (!limit) {
        client.limit.set(message.author.id, {
            time: client.uptime
        })
        limit = client.limit.get(message.author.id)
    }
    const sessionClient = client.dialogflow;
    const mess = message.content;
    const user = message.author.id;
    const sessionPath = sessionClient.sessionPath(process.env.PROJECT_ID, user)
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: mess,
                languageCode: "en-US",
            }
        }
    };
    const response = await sessionClient.detectIntent(request);
    const rep = response[0].queryResult.fulfillmentText  //Default response
    const text = require('../functions/convert')(rep, message);
    client.chats++;
    message.channel.type == 'dm' && limit ? limit.time = client.uptime : null
    message.channel.type == 'dm' ? message.reply(text) : message.channel.send(text);
}