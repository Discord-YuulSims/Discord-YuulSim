const discord = require("discord.js");
const botConfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

    /*   try{
   
           var text = "**YuulSims Bot** \n\n **__Wat kan ik?__** \n **!?hallo** Als je de bot hallo wilt zeggen. \n **!?botinfo** Als je in info over de bot wil weten. \n **!?serverinfo** Als je info van de server wil weten. \n **!?kick** Niks voor jullie! \n **!?ban** Niks voor jullie! \n **!?help** Is als je dit berichtje wil krijgen. \n **!?prefix** Als de admins de prefix moeten aanpassen. \n **!?clear** Om berichten te verwijderen. \n **!?ping** Het is gewoon iets grappige \n **!?mute** Als iemand de regels heeft overtreden. \n **!?warns** Iemand een waarschuwing geven.(alleen admins kunnen dit) \n **!?ac** Als je een mooi berichtje wilt maken. \n **!?rps** Het is blad steen schaar spel. \n **!?report** Als je vindt dat iemand de regels overtreden heeft. \n **!?tban** Is voor de admins. \n **!?ticket** Als je een vraag, bericht of wat er beter kan in de server. **!?close** Als je je ticket klaar is. \n **!?welkom** Is ook niks voor jullie.";
   
           message.author.send(text);
   
           message.reply("Je hebt een privé berichtje gekregen.");
   
       }catch (cerror){
           message.channel.send("Sorry! Er ging iets mis.");
   
       }
   */

    /* var commandList = [];
 
     bot.commands.forEach(element => {
 
         var item = {
 
             name: command.help.name,
             description: command.help.description
 
         };
 
         commandList.push(item);
 
     });
 
    var prefix = botconfig.prefix;
    var repsonse = "";
 
 */
    var commandsList = [];

    bot.commands.forEach(command => {

        var item = {

            name: command.help.name,
            description: command.help.description,
            // category: command.help.category

        }

        commandsList.push(item);

    });

    // console.log(commandsList);

    var prefix = botConfig.prefix;
    var response = "";
 
    for (var i = 0; i < commandsList.length; i++) {
 
        response += `**${prefix}${commandsList[i]["name"]} -** ${commandsList[i]["description"]} \r\n`;
 
    }
 
    message.author.send(response).then(() => {
 
        message.channel.send("Al de commando's staan in je privé berichten! :mailbox_with_mail:");
 
    }).catch(() => {
 
        message.channel.send("Je privé berichten staan uit geschakeld, je hebt geen hulp ontvangen");
 
    });


}

module.exports.help = {

    name: "help",
    description: "Krijg je dit bericht."

}