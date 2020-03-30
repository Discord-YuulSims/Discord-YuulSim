const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Jij hebt deze rol niet.");

    var user = message.guild.member(message.mentions.users.first());

    if (!user) return message.channel.send("Met dit commando moet je het zo gebruiken: !?tban gebruiker tijd reden.");

    if (user.hasPermissions("ADMINISTRATOR")) return message.channel.send("Deze gebruiker kan je niet temp bannen.");

    var tempBanTime = args[1];

    var reason = args.join(" ").slice(22);

    if (!tempBanTime) return message.channel.send("Geef een tijd mee.")

    if (!reason) return message.channel.send("Geef een reden op.")

    if (ms(tempBanTime)) {

        await message.guild.member(user).ban(reason);

        message.channel.send(`${user} hij is geband voor ${reason}`);

        setTimeout(function () {

            message.guild.unban(user.id);

            message.channel.send(`${user} is niet meer gebanned.`);


        
        }, ms(tempBanTime));

    } else {

        return message.channel.send("Geef een geldige tijd op.");
    }
}


module.exports.help = {

    name: "tban",
    description: "Is voor een tijdelijke ban.(alleen admins)"

}