module.exports = (rep, message) => {
    if(rep.includes("${time}")) {
        const time = new Date()
        rep = rep.replace('${time}', `**${time.getHours()}:${time.getMinutes()}** (UTC time)`)
    }
    if(rep.includes("${date}")) {
        const time = new Date()
        rep = rep.replace('${date}', `**${time.getDate()}/${time.getMonth()}/${time.getFullYear()}** (UTC time)`)
    }
    if(rep.includes("${membercount}")) {
        rep = rep.replace('${membercount}', message.guild.memberCount)
    }
    if(rep.includes('${serverName}')){
        rep = rep.replace('${serverName}', message.guild.name)
    }
    return rep.toString();
} 