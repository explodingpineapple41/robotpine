const Discord = require("discord.js");

module.exports.run = async (bot, message , args) => {
    let boticon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
        .setDescription("Bot Information")
        .setColor("#0061ff")
        .setThumbnail(boticon)
        .addField("Bot Name", bot.user.username)
        .addField("Bot Owner", "Exploding Pineapple #9683");
        return message.channel.send(botembed);
}

module.exports.help = {
    name: "botinfo"   
}