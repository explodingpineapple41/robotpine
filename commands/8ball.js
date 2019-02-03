const Discord = require("discord.js");
module.exports.run = async(bot, message, args) => {

if(!args[2]) return message.channel.send("Please ask a full question!");
let replies = ["100%", "70%", "30%", "0%", "50%","SYNTAX_ERROR"];

let result = Math.floor((Math.random() * replies.length));
let question = args.slice(1).join(" ");

let bembed = new Discord.RichEmbed()
.setAuthor(message.author.tag)
.setColor("#0061FF")
.addField("Question", question)
.addField("Answer", replies[result]);

message.channel.send(bembed);
return;


}

module.exports.help = {
    name: "8ball"
}