const {Client, Collection} = require("discord.js");
const {SessionsClient} = require('dialogflow')
const client = new Client();
const { readdirSync } = require("fs")
require('dotenv').config();

const privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');
const clientEmail = process.env.CLIENT_EMAIL
const config = {
    credentials: {
        private_key: privateKey,
        client_email: clientEmail
    }
}
const sessionClient = new SessionsClient(config)

client.start = new Date();
client.chats = new Number('0')
client.aliases = new Collection();
client.commands = new Collection();
client.limit = new Map();

const load = dirs => {
    const commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
    for (let file of commands) {
        let pull = require(`./commands/${dirs}/${file}`);
        client.commands.set(pull.config.name, pull);
        if (pull.config.aliases) pull.config.aliases.forEach(a => client.aliases.set(a, pull.config.name));
    };
};
readdirSync("./commands/").forEach(x => load(x));

client.dialogflow = sessionClient;

client.on('ready', require('./events/client/ready').bind(null, client));
client.on('debug', require('./events/client/debug').bind(null, client));
client.on('message', require('./events/guild/message').bind(null, client));

console.log(process.env)
client.login(process.env.BOT); 