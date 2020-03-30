const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermissions("MANAGE_MESSAGES")) return message.reply("Je hebt hier voor geen toestemming");

    if (!args[0]) return message.reply("Geef een aantal op.");

    if (Number.isInteger(parseInt(args[0]))) {

        var amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount).then(() => {

            if (args[0] == 0) {

                message.channel.send(`Sorry! Ik kan geen 0 berichten verwijderen.`).then(msg => msg.delete(10000));


            } else if (args[0] == 1) {

                message.channel.send(`Ik heb 1 bericht verwijderd.`).then(msg => msg.delete(10000));
            } else {
                message.channel.send(`Ik heb ${args} berichten verwijderd.`).then(msg => msg.delete(10000));

            }


        });

    } else {

        return message.reply("Geef een getal op.");
    }

}

module.exports.help = {

    name: "clear",
    description: "is om berichtjes de verwijderen.(alleen admins)"

}