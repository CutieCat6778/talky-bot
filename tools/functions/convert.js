module.exports = (rep, message) => {
    if(rep.includes("${time}")) {
        const time = new Date()
        rep = rep.replace('${time}', `**${time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()}:${time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()}** (UTC time)`)
    }
    if(rep.includes("${date}")) {
        const time = new Date()
        rep = rep.replace('${date}', `**${time.getDate() < 10 ? `0${time.getDate()}` : time.getDate()}/${time.getMonth() < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1}/${time.getFullYear()}** (UTC time)`)
    }
    if(rep.includes("${membercount}")) {
        rep = rep.replace('${membercount}', `**${message.guild.memberCount}**`)
    }
    if(rep.includes('${serverName}')){
        rep = rep.replace('${serverName}', message.guild.name)
    }
    return rep.toString();
} 