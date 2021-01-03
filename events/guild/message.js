const { MessageEmbed } = require('discord.js');

module.exports = async (client, message) => {
    try {
        if (message.author.bot) return;
        if (message.channel.type == "dm") {
            client.chats++;
            return require('../../tools/talking/talking.js')(message, client);
        } else if (message.channel.type != "category" || message.channel.type != "unknow" || message.channel.type != "voice") {
            if(message.author.id == "762749432658788384" && message.content.startsWith('.')){
                const args = message.content.slice('.'.length).trim().split(/ +/g);
                const cmd = args.shift().toLowerCase();
                const commanfile = client.commands.get(cmd);
                if(!commanfile) return;
                else return commanfile.execute(client, message, args);
            }
            if(message.channel.id == "778702387426361356") {
                client.chats++;
                return require('../../tools/talking/talking.js')(message, client);
            } else if (message.channel.id != "778702387426361356") {
                // Bot mentions
                if (message.mentions.members.has(message.guild.me.id)) {
                    if (require('../../tools/string/mentions')(message.content) == "794962436503371796") {
                        const embed = new MessageEmbed()
                            .setDescription(`**Note!**\nIf you want to talk with the bot **you have to go to DM(direct messages)**`)
                        message.channel.send(embed);
                    }
                }
            }
        }
    } catch (e) {
        return require('../../tools/functions/error')(e, message);
    }
}