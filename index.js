const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Kon geen files vinden. Sorry!");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`de file ${f} is geladen`);

        bot.commands.set(fileGet.help.name, fileGet);
        bot.commands.set(fileGet.help.description, fileGet);
    })

});


bot.on("ready", async () => {

    console.log('${bot.user.username} is online!');

    bot.user.setActivity("| !?help", { type: "PlAYING" });
});

bot.on("guildMemberAdd", member => {

    var role = member.guild.roles.find("name", "👀kijkers");

    if (!role) return message.channel.send("Deze rol heb ik niet gevonden.");

    member.addRole(role);

    const channel = member.guild.channels.find("name", ("🎉mensen-nieuw"));

    if (!channel) return message.channel.send("Dit kanaal niet gevonden.");

    channel.send(`Welkom bij de server ${member}`);

    var userIcon = member.user.avatarURL;

    var joinMessage = new discord.RichEmbed()
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
        .setThumbnail(userIcon)
        .setDescription(`**Hey ${member.user.username},** \n**Welkom** in de server van **YuulSims**.`)
        .setColor("#00ff73")
        .setTimestamp()
        .setFooter("Gebruiker gejoind.");

    channel.send(joinMessage);


});

bot.on("guildMemberRemove", member => {

    var role = member.guild.roles.find("name", "👀kijkers");

    if (!role) return message.channel.send("Deze rol heb ik niet gevonden.");

    member.addRole(role);

    const channel = member.guild.channels.find("name", ("🎉mensen-nieuw"));

    if (!channel) return message.channel.send("Dit kanaal niet gevonden.");

    channel.send(`${member} is van de server.`);

    var userIcon = member.user.avatarURL;

    var joinMessage = new discord.RichEmbed()
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
        .setThumbnail(userIcon)
        .setDescription(`**${member.user.username} heeft de server verlaten.** \n Met pijn in het hart moeten wij afscheidt nemen van ${member.user.username}`)
        .setColor("#ff5500")
        .setTimestamp()
        .setFooter("Gebruiker geleavd");

    channel.send(joinMessage);

});

var swearWords = ["kanker", "bitch", "fack you", "haat", "kut"];


bot.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;
    var prefixes = JSON.parse(fs.readFileSync("./prefixes.json"));

    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: botConfig.prefix
        };
    }

    var prefix = prefixes[message.guild.id].prefixes;


    //  var prefix = botConfig.prefix;


    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);

    var commands = bot.commands.get(command.slice(prefix.length));

    if (commands) commands.run(bot, message, arguments);

    /*var msg = message.content.toLowerCase();
   
    for(var i = 0; i < swearWords.length; i++) {
   
       if(msg.includes(swearWords[i])){
   
           message.delete();
   
           return message.channel.send("Gelieve niet de schelden deze server.").then(msg => msg.delete(3000));
       }
   
   
   }*/

    //var swearWords = JSON.parse(fs.readFileSync("./Data/swearWords.json"));


    /*var msg = message.content.toLowerCase();
   
    for(var i = 0; i < swearWords["vloekWoorden"].length; i++) {
   
       if(msg.includes(swearWords["vloekWoorden"][i])){
   
           message.delete();
   
           return message.channel.send("Gelieve niet de schelden deze server.").then(msg => msg.delete(3000));
       }
   
   
   }  */

    if (!commands) {

        var swearWords = JSON.parse(fs.readFileSync("./Data/swearWords.json"));

        var sentenceUser = "";

        var amountSwearWords = 0;

        for (var y = 0; y < messageArray.length; y++) {

            var changeWord = "";

            for (var i = 0; i < swearWords["vloekWoorden"].length; i++) {

                var word = messageArray[y].toLowerCase();

                if (word == swearWords["vloekWoorden"][i]) {

                    changeWord = word.replace(swearWords["vloekWoorden"][i], "****");

                    sentenceUser = sentenceUser + " " + changeWord;

                    amountSwearWords++;
                }
            }

            if (!changeWord) {

                sentenceUser = sentenceUser + " " + messageArray[y];
            }
        }

        if (amountSwearWords != 0) {

            message.delete();
            message.channel.send(sentenceUser);
            message.channel.send(message.author + ", zo u zo vriendelijk willen zijn om niet te vloeken.");
        }
    }

});
bot.login(botConfig.token);
