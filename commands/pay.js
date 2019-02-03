const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../JSONdatabase/coins.json");

module.exports.run = async (bot, message , args) => {
    if(!args[1]) return message.channel.send("Please specify who you want to pay.").then(m=>m.delete(5000))
    let puser = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!puser) return message.channel.send("Please specify who you want to pay.");
    if(isNaN(args[1])) return message.channel.send("The entered amount is not valid!").then(m=>m.delete(5000))
    let amount = parseInt(args[1])
    if(!coins[puser.id]){
        coins[puser.id] = {
            coins: 0
        };
    }
    if(!coins[message.author.id]){
        coins[message.author.id] = {
            coins: 0
        };
    }
    let pcoins = coins[puser.id].coins;
    let scoins = coins[message.author.id].coins;

    
    if(scoins < amount) {
        return message.channel.send("You don't have enough coins!");
    }

    if(amount < 0) {
        return message.channel.send("You can't steal coins!");
    }
    
    message.channel.send(`${message.author} has given ${puser} ${amount} coins!`);

    coins[message.author.id].coins =  scoins - amount
    coins[puser.id].coins =  pcoins + amount

    fs.writeFile("./JSONdatabase/coins.json", JSON.stringify(coins), (err) => {
        if (err) console.log(err)
    });
    
    

}

module.exports.help = {
    name: "pay"   
}