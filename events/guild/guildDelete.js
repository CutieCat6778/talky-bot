const { MessageEmbed, WebhookClient } = require("discord.js");

module.exports = (client, guild) => {
    const hook = new WebhookClient(process.env.hookId, process.env.hookToken);
    const embed = new MessageEmbed()
        .setTitle(`${client.user.username} left ${guild.name}`)
        .setTimestamp()
        .setFooter(`Server ${client.guild.cache.size}`)
    return hook.send(embed);
}