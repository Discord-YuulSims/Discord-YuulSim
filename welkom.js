const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    var icon = message.guild.iconURL;
    message.delete();
    var welkom = new discord.RichEmbed()
        .setTitle("Welkom")
        .setThumbnail(icon)
        .setColor("#00fcca")
        .setDescription("\n ~~ --------------------- ~~ \n**Welkom** op de **officiële** server van @YuulSims#2680. \n Deze server dient om mensen **samen **de brengen. \nGelieve **niet** @👀kijkers /@here /@everyone te **taggen** \n Zoek** geen **ruzie **A.U.B**. \n  Anders mag je nu al weg. \n **Niet** komen** zeuren** om een rol. \n Kijk zeker de #📝regels. \n Voor hulp kan je terecht bij: HELP! \nYuulsims kanaal:https://www.youtube.com/channel/UCuA9wPbDNf6D5oTLynPEG0w \n Discord link: https://discord.gg/U7qh5nV \n   ~~ -------------------------------------------------------------------------- ~~ \n  **MVG** \n**het** @🎖YuulSims Team");

    message.channel.send(welkom);


}

module.exports.help = {

    name: "welkom",
    description: "Is voor het welkoms bericht.(alleen admins)"

}