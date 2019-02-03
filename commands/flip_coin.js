const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../JSONdatabase/coins.json");



module.exports.run = async (bot, message , args) => {
    //flip heads 100
    let ucoins = coins[message.author.id].coins;
    let predicion = args[0];
    let bet = args[1];
    let flip = ["heads", "tails"];
    if(message.channel.name !== "flip-a-coin") return message.channel.send("This isn't the place to gamble!").then(msg => {msg.delete(5000)});
    if(!predicion) return message.channel.send("Please make a prediction.");
    if(!flip.includes(predicion.toLowerCase())) return message.channel.send("Your guess can only be 'heads' or 'tails'.");
    if(!bet) return message.channel.send("Please bet a specific amount.");
    if(bet === 0) return message.channel.send("You must bet something!");
    if(isNaN(bet)) return message.channel.send("Please bet a number.");
    if(bet > ucoins) return message.channel.send("You don't have that many coins!");
    if(bet < 0) return message.channel.send("Your bet can't be lower than 0.");

    let result = Math.floor(Math.random() * flip.length);

    if (predicion !== flip[result]) {
        coins[message.author.id].coins = ucoins - bet
        message.channel.send(`You lost the coin toss and lost ${bet} coins.`)
    } else {
        coins[message.author.id].coins = ucoins + bet
        message.channel.send(`You won the coin toss and gained ${bet} coins.` ) 
        
    }
    fs.writeFile("./JSONdatabase/coins.json", JSON.stringify(coins), (err) => {
        if (err) console.log(err)
    });
    
}

module.exports.help = {
    name: "flip"   
}
