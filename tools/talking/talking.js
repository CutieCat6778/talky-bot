const dialogflow = require('dialogflow')

module.exports = async(message, sessionClient) => {
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