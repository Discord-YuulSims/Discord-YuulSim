const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var idee = args.join(' ');
    if (!idee) return message.channel.send("Geen idee meegegeven. Wilt u een idee meegeven.");
    message.delete();
    var ideeEmbed = new discord.RichEmbed()
        .setTitle("Nieuw idee:triangular_flag_on_post:")
        .setColor("#f8fc03")
        .addField("Idee", idee)
        .addField("Ingezonden door", message.author);

    var ideeChannel = message.guild.channels.find("name", "😜idee");
    if (!ideeChannel) return message.channel.send("Idee kanaal niet gevonden.");

    ideeChannel.send(ideeEmbed).then(embedMessage => {

        embedMessage.react('👍');
        embedMessage.react('👎');
    });


}

module.exports.help = {

    name: "idee",
    description: "Heb jij een idee voor de server? Ja doe dit dan."

}