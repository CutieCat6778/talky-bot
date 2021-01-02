const {Client, Collection} = require("discord.js");
const client = new Client();
require('dotenv').config();

require('./handlers/commands')(client);

client.start = new Date();
client.chats = 0;
client.aliases = new Collection();
client.commands = new Collection();
client.guild = new Collection();

client.on('ready', require('./events/client/ready').bind(null, client));
client.on('debug', require('./events/client/debug').bind(null, client));
client.on('message', require('./events/guild/message').bind(null, client));

console.log(process.env)
client.login(process.env.BOT); 