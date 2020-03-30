const discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {


    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Sorry! Jij kan dit niet doen.");

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!user) return message.channel.send("Gebruiker niet gevonden..");

    if (user.hasPermission("ADMINISTRATOR")) return message.channel.send("Je kan deze gebruiker niet mute.");

    var muteRole = message.guild.roles.find("name", "muted");

    if (!muteRole) return message.channel.send("Deze rol is er niet.");

    var muteTime = args[1];

    if (!muteTime) return message.channel.send("Geef een tijd mee.");

    await (user.addRole(muteRole.id));

    message.channel.send(`${user} is gemuted voor ${muteTime}`);

    setTimeout(function () {

        user.removeRole(muteRole.id);
        message.channel.send(`${user} is geunmuted.`);

    }, ms(muteTime));

}

module.exports.help = {

    name: "mute",
    description: "Om iemand de mute.(alleen admins)"

}