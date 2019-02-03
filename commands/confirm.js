const Discord = require("discord.js");
const fs = require("fs");
let username = require("../JSONdatabase/iduser.json");

module.exports.run = async (bot, message , args) => {
    if(username[message.author.id]) return message.channel.send("You are already confirmed.").then(msg => {msg.delete(5000)});
    else message.reply("You have been confirmed.").then(msg => {msg.delete(5000)});

    username[message.author.id] = {
        username: message.author.username
    };

    let confirmedrole = message.guild.roles.find(n => n.name === "Citizen");
    if (!confirmedrole){
        try{
            confirmedrole = await message.guild.createRole({
                name: "confirmed",
                color: "#54ffae",
                permissions:[]
            });
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermission(muterole, {
                    SEND_MESSAGES: true,
                    ADD_REACTIONS: true
                });
            });
        }catch(e){
            console.log(e.stack);
        }
    }
    let cuser = message.member;
    await(cuser.addRole(confirmedrole.id));
    
    


    fs.writeFile("./JSONdatabase/iduser.json", JSON.stringify(username), (err) => {
        if (err) console.log(err)
    });
    

}

module.exports.help = {
    name: "confirm"   
}