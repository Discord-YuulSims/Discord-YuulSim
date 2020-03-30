const discord = require("discord.js");

module.exports.run =  async(bot, message, args) => {

   
        var icon = message.guild.iconURL;
        var serverEmbed = new discord.RichEmbed()
            .setDescription("server info")
            .setColor(128, 0, 255)
            .setThumbnail(icon)
            .addField("bot naam", bot.user.username)
            .addField("Je bent gejoind op:", message.member.joindAt)
            .addField("totaal @👀kijkers", message.guild.memberCount);



        return message.channel.send(serverEmbed);

    


}

module.exports.help = {

name: "serverinfo",
description: "Als je meer info over de server wil;"

}