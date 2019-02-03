const Discord = require("discord.js");

module.exports.run = async (bot, message , args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.channel.send("Can't find user!");
        let breason = args.join(" ").slice(22);
        if(!breason) return message.channel.send("Please specify a reason.");
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You are not an admin!");
        if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be banned!");
        let banembed = new Discord.RichEmbed()
        .setDescription("Ban")
        .setColor("#0061ff")
        .addField("Banned User", `${bUser} with ID: ${bUser.id}`)
        .addField("Banned By", `${message.author} with ID: ${message.author.id}`)
        .addField("Banned In", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", breason);
        let banchannel = message.guild.channels.find(`name`, "bans");
        if(!banchannel) return message.channel.send("Can't find channel.");
        message.guild.member(bUser).ban(breason);

        banchannel.send(banembed);
        return;
}

module.exports.help = {
    name: "ban"   
}