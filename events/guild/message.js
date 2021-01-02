module.exports = (client, message) => {
    try {
        if (message.author.bot) return;
        if (message.channel.type == "dm") {
            return require('../../tools/talking/talking.js')(message);
        } else if (message.channel.type != "category" || message.channel.type != "unknow" || message.channel.type != "voice") {
            if(message.channel.id != "778702387426361356") return;
            return require('../../tools/talking/talking.js')(message);
        }
    } catch (e) {
        return require('../../tools/functions/error')(e, message);
    }
}