const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message , args) => {
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.channel.send("Couldn't find user.");
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You cannot mute this person.");
    let muterole = message.guild.roles.find(n => n.name === "muted");
    if (!muterole){
        try{
            muterole = await message.guild.createRole({
                name: "muted",
                color: "#54ffee",
                permissions:[]
            });
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermission(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        }catch(e){
            console.log(e.stack);
        }
    }
    let mutetime = args[1];
    if(!mutetime) return message.channel.send("You didn't specify a time!");
    await(tomute.addRole(muterole.id));
    message.channel.send(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

    setTimeout(function(){
        tomute.removeRole(muterole.id);
        message.channel.send(`<@${tomute.id}> has been unmuted.`);
    }, ms(mutetime));
}

module.exports.help = {
    name: "mute"   
}