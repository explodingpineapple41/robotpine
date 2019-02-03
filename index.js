const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({
    disableEveryone: true
});
let coins = require("./JSONdatabase/coins.json");
let xp = require("./JSONdatabase/xp.json");
let level = require("./JSONdatabase/xp.json");
let cooldown = new Set();
let cdseconds = 3;
bot.commands = new Discord.Collection();


fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("Techno Music.", {
        type: "LISTENING"
    });
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    let conchannel = message.guild.channels.find(`name`, "confirmation");
    if (message.channel.name === "confirmation" && message.author.id !== "449309525342814229") await message.delete();
    let prefix = botconfig.prefix;
    if(!message.content.startsWith(prefix)) return;
    if(cooldown.has(message.author.id)) {
        message.delete();
        return message.reply(`You have to wait ${cdseconds} seconds before commands`);
    }
    cooldown.add(message.author.id);

    if (message.content.startsWith(prefix)) {
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        let args = messageArray.slice(1);

        let commandfile = bot.commands.get(cmd.slice(prefix.length));
        if (commandfile) commandfile.run(bot, message, args);

        setTimeout(() => {
            cooldown.delete(message.author.id)
        }, cdseconds * 1000)

    } else {
        let coinstoadd = Math.ceil(Math.random() * 50);
        if (!coins[message.author.id]) {
            coins[message.author.id] = {
                coins: 100
            };
        }
        if (coinstoadd > 45) {
            coins[message.author.id] = {
                coins: coins[message.author.id].coins + coinstoadd
            };
            fs.writeFile("./JSONdatabase/coins.json", JSON.stringify(coins), (err) => {
                if (err) console.log(err)
            });
        }
        let xpAdd = Math.floor(Math.random() * 7) + 8;

        if (!xp[message.author.id]) {
            xp[message.author.id] = {
                xp: 0,
                level: 1
            };
        }


        let curxp = xp[message.author.id].xp;
        let curlvl = xp[message.author.id].level;
        let nxtLvl = xp[message.author.id].level * 5000;
        xp[message.author.id].xp = curxp + xpAdd;
        if (nxtLvl <= xp[message.author.id].xp) {
            xp[message.author.id].level = curlvl + 1;
        }
        fs.writeFile("./JSONdatabase/xp.json", JSON.stringify(xp), (err) => {
            if (err) console.log(err)
        });









    }




});

bot.login(process.env.token);
