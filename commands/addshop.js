const Discord = require("discord.js");
let shop = require("../JSONdatabase/shop.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    //addshop thing 6
    let itemname = args.join(" ");
    const filter = m => m.author.id === message.author.id;
    message.reply(`Type in the price of ${itemname}. Expires in 15 seconds...`).then(r => r.delete(15000));
    message.channel.awaitMessages(filter, {
        max: 1,
        time: 15000
    }).then(collected => {

        let price = collected.first().content;
        if (!itemname) return message.channel.send("Put in an item name");
        if (isNaN(price)) return message.channel.send("That is not a valid price!");
        if (shop[itemname]) return message.channel.send("That item is already in shop");
        shop[itemname] = {
            price: price
        };
        message.channel.send("That item is now in the shop.");

        fs.writeFile("./JSONdatabase/shop.json", JSON.stringify(shop), (err) => {
            if (err) console.log(err)
        });
    }).catch(err => {
        message.reply("Your time has expired.").then(m => {m.delete(5000)});
    })

}

module.exports.help = {
    name: "addshop"
}