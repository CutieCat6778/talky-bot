module.exports = async(message, client) => {
    const limit = client.limit.get(message.author.id);
    if(!limit){
        client.limit.set(message.author.id, {
            time: client.uptime
        })
    }
    if(client.uptime - limit.time < 20000) return message.channel.send("Slowdown, bro. Don't spam me.")
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
    message.channel.type == 'dm' ? message.reply(text) : message.channel.send(text);
}