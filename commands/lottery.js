const Discord = require("discord.js");
let coins = require("../JSONdatabase/coins.json");
const fs = require("fs");


module.exports.run = async (bot, message, args) => {
    // !lotto 74
    let ucoins = coins[message.author.id].coins;
    let guess = args[0];
    if(message.channel.name !== "lottery") return message.channel.send("This isn't the place to gamble!").then(msg => {msg.delete(5000)});
    if (!guess) return message.channel.send("Specify your guess for the magic number.");
    if (isNaN(guess)) return message.channel.send("Make your guess an actual number.");
    let result = Math.floor(Math.random() * 98) + 1;
    if (guess === result) {
        coins[message.author.id].coins = ucoins + 99900
        message.reply("YOU WON THE LOTTERY!");
    } else {
        coins[message.author.id].coins = ucoins - 100
        message.reply("You didn't guess correctly.");
    }

    fs.writeFile("./JSONdatabase/coins.json", JSON.stringify(coins), (err) => {
        if (err) console.log(err)
    });


}

module.exports.help = {
    name: "lotto"
}