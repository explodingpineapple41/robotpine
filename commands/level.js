const Discord = require("discord.js");
let xp = require("../JSONdatabase/xp.json");


module.exports.run = async (bot, message , args) => {
    
    if (!xp[message.author.id]) {
        xp[message.author.id] = {
            xp: 0,
            level: 1
        };
    }

    let nlxp = xp[message.author.id].level * 5000;
    let diff = nlxp - xp[message.author.id].xp;
    let embed = new Discord.RichEmbed()
    .setTitle("Experience")
    .setColor("#0000FF")
    .setThumbnail("https://i.imgur.com/jm53TQ4.png")
    .addField("XP", xp[message.author.id].xp, true)
    .addField("Level", xp[message.author.id].level, true)
    .setFooter(`You need ${diff} more XP to level up.`)
    message.channel.send(embed);

}

module.exports.help = {
    name: "level"   
}