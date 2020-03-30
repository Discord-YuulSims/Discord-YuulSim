const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Sorry! jij kan dit niet.");


    var splitser = "//";

    if (args[0] == null) {

        var userMessage = new discord.RichEmbed()
            .setTitle("**__Gebruik__**")
            .setColor("#9802f5")
            .setDescription(`Maak een announcement door gebruik te maken van: \n !?ac titel ${splitser} bericht ${splitser} kleur ${splitser} kanaal.`);

        return message.channel.send(userMessage);
    }

    args = args.join(" ").split(splitser);

    if (args[2] == undefined) args[2] = "#eeeeee";
    if (args[3] == undefined) args[3] = "✏algemeen";
    var options = {

        titel: args[0] || "Melding",
        bericht: args[1] || "Dit bericht heeft geen inhoudt.",
        kleur: args[2].trim(),
        kanaal: args[3].trim()
    }

    var announcer = message.author;

    var announcementEmbed = new discord.RichEmbed()
        .setTitle("Melding:")
        .setColor(options.kleur)
        .setDescription(`Bericht van ${announcer} \n\n ${options.titel} \n\n ${options.bericht}`)
        .setTimestamp();
    var announcementChannel = message.guild.channels.find(`name`, options.kanaal);
    if (!announcementChannel) return message.channel.send("Kan het kanaal niet vinden.");

    announcementChannel.send(announcementEmbed);


}

module.exports.help = {

    name: "ac",
    description: "Als je een mooi bericht wil maken.(alleen admins)"

}


