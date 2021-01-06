const { MessageEmbed } = require('discord.js');

module.exports = async (client, message) => {
    try {
        if (message.author.bot) return;
        if (client.startUp == false) return;
        if (message.channel.type == "dm") {
            return require('../../tools/talking/talking.js')(message, client);
        } else if (message.channel.type != "category" || message.channel.type != "unknow" || message.channel.type != "voice") {
            if (message.author.id == "762749432658788384" && message.content.startsWith('.')) {
                const args = message.content.slice('.'.length).trim().split(/ +/g);
                const cmd = args.shift().toLowerCase();
                const commanfile = client.commands.get(cmd);
                if (!commanfile) return;
                else return commanfile.execute(client, message, args);
            }
            //Getting guild's cache
            let guildCache = client.guild.get(message.guild.id);
            if(!guildCache){
                guildCache = await require('../../tools/database/getGuild')(message.guild.id);
                client.guild.set(message.guild.id, guildCache);
            }
            // Bot mentions
            if (message.mentions.members.has(message.guild.me.id)) {
                if (require('../../tools/string/mentions')(message.content) == "794962436503371796") {
                    const embed = new MessageEmbed()
                        .setDescription(`**Prefix** \`${guildCache.prefix}\`\n\n**Note!**\nIf you want to talk with the bot you have to go to **DM(direct messages)** \n or type in **chat a text start with \`${guildCache.prefix}\`**`)
                    message.channel.send(embed);
                }
            }
            // talking with bot
            if(message.content.startsWith(guildCache.prefix) && guildCache.channels.map(g => g._id == message.channel.id).length == 0){
                message.content = await require('../../tools/string/cleanUpString')(message.content);
                message.channel.startTyping(1.5)
                setTimeout(() => {
                    message.channel.stopTyping(true);
                    return require('../../tools/talking/talking')(message, client);
                }, 1500);
            }
        }
    } catch (e) {
        return require('../../tools/functions/error')(e, message);
    }
}