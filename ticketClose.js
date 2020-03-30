const discord = require("discord.js");

module.exports.run =  async(bot, message, args) => {

    const categoryid = "693824209780211752";

    if(message.channel.parentID == categoryid){

        message.channel.delete();

    }else{

        message.channel.send("Gelieve dit commando in een ticket kanaal te doen.");
    }

    var embedTicketDone = new discord.RichEmbed()
        .setTitle("Hey, " + message.channel.name)
        .setColor("#5400fc")
        .setDescription("Je ticket is gemarkeerd als **__compleet__**.\n Wil je een nieuwe maken doe dan !?ticket")
        .setFooter("ticket klaar.");

        var ticketChannel = message.guild.channels.find("name", "📕ticket-klaar");
        if(!ticketChannel) return message.channel.send("Kanaal bestaat niet.");

        ticketChannel.send(embedTicketDone);



}

module.exports.help = {

name: "close",
description: "Is als u ticket klaar is."

}