const Discord = require("discord.js");

module.exports.run = async (bot, message , args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't find user!");
    let kreason = args.join(" ").slice(22);
    if(!kreason) return message.channel.send("Please specify a reason.");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You are not an admin!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");
    let kickembed = new Discord.RichEmbed()
    .setDescription("Kick")
    .setColor("#0061ff")
    .addField("Kicked User", `${kUser} with ID: ${kUser.id}`)
    .addField("Kicked By", `${message.author} with ID: ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kreason);
    let kickchannel = message.guild.channels.find(`name`, "kicks");
    if(!kickchannel) return message.channel.send("Can't find channel.");
    message.guild.member(kUser).kick(kreason);
    
    
    kickchannel.send(kickembed);

    return;
}

module.exports.help = {
    name: "kick"   
}