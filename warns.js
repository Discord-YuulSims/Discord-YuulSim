const discord = require("discord.js");
const fs = require("fs");

const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {


    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Sorry! Jij kan dit niet doen.");

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!user) return message.channel.send("Deze gebruiker niet gevonden.")

    if (user.hasPermission("ADMINISTRATOR")) return message.channel.send("Je kan deze gebruiker niet waarschuwen.");

    var reason = args.join(" ").slice(22);

    if (!reason) return message.channel.send("Geef een reden.")

    if (!warns[user.id]) warns[user.id] = {

        warns: 0
    };

    warns[user.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) Console.log(err);
    });

    var warnEmbed = new discord.RichEmbed()
        .setDescription("**__Waarschuwing__**")
        .setColor("#ee0000")
        .addField("Warned gebruiker:", user)
        .addField("Gewarned door:", message.author)
        .addField("Aantal warns:", warns[user.id].warns)
        .addField("Reden:", reason);
    var warnChannel = message.guild.channels.find('name', '😭warn_kick_ban');

    if (!warnChannel) return message.guild.send("kanaal niet gevonden.(kijk goed naar tip fouten of het wel echt een texstkanaal is");

    warnChannel.send(warnEmbed);

    if (warns[user.id].warns == 2) {
        var warnBericht = new discord.RichEmbed()
            .setDescription("**__PAS OP!__**" + user)
            .setColor("#ee0000")
            .addField("bericht", "Nog één warn en je krijgt een ban!")

        message.channel.send(warnBericht);

    } else if (warns[user.id].warns == 3) {

        message.guild.member(user).ban(reason);
        message.channel.send(`${user} is verbannen!`)

    }


}

module.exports.help = {

    name: "warn",
    description: "Dient om iemand een waarschuwing te geven.(alleen admins)"

}