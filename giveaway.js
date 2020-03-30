const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var item = "";
    var time;
    var winnerCount;

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Sorry! Jij kan dit niet.");

    winnerCount = args[0];
    if (!winnerCount) return message.channel.send("Geef een aantal winnaars op.");

    time = args[1];
    if (!time) return message.channel.send("Geef een tijd mee.");

    item = args.splice(2, args.length).join(' ')
    if (!item) return message.channel.send("Geef een prijs mee.");

    message.delete();

    var date = new Date().getTime();
    var dateTime = new Date(date + (time * 1000));

    var giveawayEmbed = new discord.RichEmbed()
        .setTitle("🎉 **GIVEAWAY** 🎉")
        .setFooter(`vervalt: , ${dateTime}`)
        .setDescription(item);

    var embedSend = await message.channel.send(giveawayEmbed);
    embedSend.react("🎉");

    setTimeout(function () {

        var random = 0;
        var winners = [];
        var inList = false;
        var peopleReacted = embedSend.reactions.get("🎉").users.array();
 
        
        for (var i = 0; i < peopleReacted.length; i++) {
            if (peopleReacted[i].id == bot.user.id) {
                peopleReacted.splice(i, 1);
                continue;
            }
        }
 
      
        if (peopleReacted.length == 0) {
            return message.channel.send("Niemand heeft gewonnen dus de bot wint.");
        }
 
        
        if (peopleReacted.length < winnerCount) {
            return message.channel.send("Er zijn te weinig mensen die mee deden daarom heeft de bot gewonnen.");
        }
 
       for (var i = 0; i < winnerCount; i++) {
 
            inList = false;
 
           
            random = Math.floor(Math.random() * peopleReacted.length);
 
            for (var y = 0; y < winners.length; y++) {
                
                if (winners[y] == peopleReacted[random]) {
                    
                    i--;
                    
                    inList = true;
                    break;
                }
            }
 
            if (!inList) {
                winners.push(peopleReacted[random]);
            }
 
        }
 
        for (var i = 0; i < winners.length; i++) {
            message.channel.send("Proficiat " + winners[i] + `! Je hebt gewonnen **${item}**.`);
        }


    }, time * 1000);



}

module.exports.help = {

    name: "giveaway",
    description: "Dient voor de giveaway's"

}