const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    const categoryid = "693824209780211752";

    var userName = message.author.username;
    var userDiscriminator = message.author.discriminator;

    var bool = false;

    message.guild.channels.forEach((channel) => {

        if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {

            message.channel.send("Sorry! Je hebt al een ticket.");

            bool = true;


        }
    });

    if (bool == true) return;

    var embedCreateTicket = new discord.RichEmbed()
        .setTitle("Hey, " + message.author.username)
        .setColor("#50fc00")
        .setDescription("Support kanaal wordt aangemaakt.")
        .setFooter("Bedankt om een ticket aan te maken")

    message.channel.send(embedCreateTicket);

    message.guild.createChannel(userName + "-" + userDiscriminator, "text").then((createChan) => {
        createChan.setParent(categoryid).then(

            (settedParent) => {

                settedParent.overwritePermissions(message.guild.roles.find(`name`, "@everyone"), { "READ_MESSAGES": false });

                settedParent.overwritePermissions(message.author, {

                    "READ_MESSAGES": true, "SEND_MESSAGES": true,
                    "ATTACH_FILES": true, "CONNECT": true,
                    "CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": false
                });

                var embedTicketChannel = new discord.RichEmbed()
                    .setTitle("Hey, " + message.author.username.toString())
                    .setColor("#fcb000")
                    .setDescription("Zet hier jouw vraag/bericht.");

                settedParent.send(embedTicketChannel);
            }).catch(err => {
                message.channel.send("Er is iets fout gelopen.");
            });
    }).catch(err => {
        message.channel.send("Er is iets fout gelopen.");
    });


}






module.exports.help = {

    name: "ticket",
    description: "Als je een vraag,bericht of water beter kan. Doe dit dan."

}