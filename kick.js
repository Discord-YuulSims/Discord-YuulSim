const discord = require("discord.js");

module.exports.run =  async(bot, message, args) => {

    var kickUser = message.guild.member(message.mentions.users.first()|| message.guild.members.get(args[0]));

    
    if (!kickUser) return message.channel.send("Gebruiker niet gevonden op de");
     var reason = args.join(" ").slice(22);

     if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Jij hebt deze rol niet.");
    if (kickUser.hasPermission("ADMINISTRATOR")) return message.channel.send("Sorry je kan deze gebruiker niet kicken.");
    
    var kick = new discord.RichEmbed()
        .setDescription("**__Kick__**")
        .setColor("#ee0000")
        .addField("Kicked gebruiker:", kickUser)
        .addField("Gekicked door:", message.author)
        .addField("Reden:", reason);
    var kickChannel = message.guild.channels.find('name', '😭warn_kick_ban');
    
    if (!kickChannel) return message.guild.send("kanaal niet gevonden.(kijk goed naar tip fouten of het wel echt een texstkanaal is");

    message.guild.member(kickUser).kick(reason);


    kickChannel.send(kick);
    

    
   // return;


}

module.exports.help = {

name: "kick",
description: "Dient voor als je iemand wil kicken.(alleen admins)"

}