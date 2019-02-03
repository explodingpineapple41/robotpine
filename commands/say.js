const Discord = require("discord.js");

module.exports.run = async (bot, message , args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have permission to do that!");
    let bmessage = args.join(" ");
    message.delete().catch();
    message.channel.send(bmessage);

    
}

module.exports.help = {
    name: "say"   
}