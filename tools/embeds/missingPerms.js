const { MessageEmbed } = require("discord.js")

module.exports = (perms) => {
    const embed = new MessageEmbed()
        .setTitle(`Missing permission for this command`)
        .setDescription(`\`\`\`diff\n${perms.map(p => `- ${p}`).join("\n")}\n\`\`\``)
        .setFooter(`Missing permission`)
        .setTimestamp()
    return embed;
}