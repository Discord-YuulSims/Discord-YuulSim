const discord = require("discord.js");
const botConfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {


    var prefix = botConfig.prefix;

    if (!args[0]) return message.channel.send(`Gebruik het command als volgt: ${prefix}report gebruiker reden.`);

    var user = message.guild.member(message.mentions.users.first());

    if (!user) return message.channel.send(`Geldige Gebruiker opgeven A.U.B.`);

    var reason = args.join(" ").slice(22);

    if (!reason) return message.channel.send(`Geef een reden op te geven.`);

    var reportEmbed = new discord.RichEmbed()
        .setTitle("Report:")
        .setColor("#bd00fc")
        .addField("Reported gebruiker", `${user}`)
        .addField("Report door", `${message.author}`)
        .addField("Reden", `${reason}`)
        .setFooter(message.createdAt);

        var reportChannel = message.guild.channels.find("name", "😭warn_kick_ban");
        if(!reportChannel) return message.channel.send("Kanaal niet gevonden.");

        message.delete();

        return reportChannel.send(reportEmbed);
}

module.exports.help = {

    name: "report",
    description: "Als je vindt dat iemand de regels overtreden heeft."

}