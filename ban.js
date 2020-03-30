const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!banUser) return message.channel.send("Gebruiker niet gevonden op de");
    var reason = args.join(" ").slice(22);

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Jij hebt deze rol niet.");
    if (banUser.hasPermission("ADMINISTRATOR")) return message.channel.send("Sorry je kan deze gebruiker niet bannen.");

    var ban = new discord.RichEmbed()
        .setDescription("**__Ban__**")
        .setColor("#ee0000")
        .addField("Banned gebruiker:", banUser)
        .addField("Gebanned door:", message.author)
        .addField("Reden:", reason);
    var banChannel = message.guild.channels.find('name', '😭warn_kick_ban');

    if (!banChannel) return message.guild.send("kanaal niet gevonden.(kijk goed naar typfouten of het wel echt een textkanaal is");

    message.guild.member(banUser).ban(reason);


    banChannel.send(ban);



   // return;


}


module.exports.help = {

    name: "ban",
    description: "Is voor als je iemand wil bannen.(alleen admins)"

}