const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    const numberOfStars = args[0];

    if (!numberOfStars || numberOfStars < 1 || numberOfStars > 5) return message.channel.send("U moet een aantal aan sterren opgeven tussen 1 tot 5.");

    const bericht = args.splice(1, args.length).join(' ') || '**Geen bericht meegegeven.**';

    var reviewChannel = message.guild.channels.find("name", "⭐review");
    if (!reviewChannel) return message.channel.send("kanaal niet gevonden.");

    var stars = "";

   for (var i = 0; i < numberOfStars; i++) {
 
        stars += ":star: ";
 
    }
    message.delete();
    const review = new discord.RichEmbed()
        .setTitle(`${message.author.username} heeft een review geschreven.:tada:`)
        .setColor("#00ff00")
        .setThumbnail("https://f0.pngfuel.com/png/408/238/purple-robot-logo-png-clip-art.png")
        .addField("**sterren**", `${stars}`)
        .addField("review: ", `${bericht}`);

    message.channel.send(":white_check_mark:Je hebt succesvol een review geschreven!");
    return reviewChannel.send(review);



}

module.exports.help = {

    name: "review",
    description: "Wil je van iets of iemand sterren geven."

};