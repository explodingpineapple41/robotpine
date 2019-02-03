const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../JSONdatabase/coins.json");



module.exports.run = async (bot, message , args) => {
    //flip heads 100
    let ucoins = coins[message.author.id].coins;
    let predicion = args[0];
    let bet = args[1];
    let flip = ["1", "2", "3", "4", "5", "6"];
    if(message.channel.name !== "roll-a-dice" && message.channel.name !== "testing") return message.channel.send("This isn't the place to gamble!").then(msg => {msg.delete(5000)});
    if(!predicion) return message.channel.send("Please make a prediction.");
    if(!flip.includes(predicion)) return message.channel.send("Your guess can only be a whole number from 1-6");
    if(!bet) return message.channel.send("Please bet a specific amount.");
    if(bet === 0) return message.channel.send("You must bet something!");
    if(isNaN(bet)) return message.channel.send("Please bet a number.");
    if(bet > ucoins) return message.channel.send("You don't have that many coins!");
    if(bet < 0) return message.channel.send("Your bet can't be lower than 0.");

    let result = Math.floor(Math.random() * 6);

    if (predicion !== flip[result]) {
        coins[message.author.id].coins = ucoins - bet
        message.channel.send(`You lost the dice roll and lost ${bet} coins.`)
    }
    if(predicion === flip[result]) {
        coins[message.author.id].coins = ucoins + (6*bet)
        message.channel.send(`You won the dice roll and gained ${6 * bet} coins.` ) 
        
    }
    fs.writeFile("./JSONdatabase/coins.json", JSON.stringify(coins), (err) => {
        if (err) console.log(err)
    });
    
}

module.exports.help = {
    name: "roll"   
}