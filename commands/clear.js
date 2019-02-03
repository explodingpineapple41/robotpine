const Discord = require("discord.js");

module.exports.run = async (bot, message , args) => {
    
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You are not an admin!");
    if(!args[0]) {
        message.channel.send("Please specify a number of messages to delete")
    }
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(5000));
    });

}

module.exports.help = {
    name: "clear"   
}