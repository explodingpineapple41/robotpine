const Discord = require("discord.js");
let coins = require("../JSONdatabase/coins.json");



module.exports.run = async (bot, message , args) => {
    await message.delete();

    
    
        let embed = new Discord.RichEmbed()
        .setTitle("Currency")
        .setColor("#0000FF")
        .setThumbnail("https://i.imgur.com/3VdDSu5.png")
        .addField("Coins", coins[message.author.id].coins);
        message.channel.send(embed);
        
    

    
        
        
        
    

    
}

module.exports.help = {
    name: "coins"   
}