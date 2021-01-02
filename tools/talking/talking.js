const dialogflow = require('dialogflow')

module.exports = async(message) => {
    const mess = message.content;
    const user = message.author.id;
    const privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');
    const clientEmail = process.env.CLIENT_EMAIL
    let config = {
        credentials: {
            private_key: privateKey,
            client_email: clientEmail
        }
    }
    const sessionClient = new dialogflow.SessionsClient(config)
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
    message.channel.type == 'dm' ? message.reply(rep) : message.channel.send(rep);
}