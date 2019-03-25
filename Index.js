const botconfig = require("./botconfig.json");
const token = require("./token.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setGame("with DefiantVideos");
});

bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  
  if(cmd === `${prefix}serverinfo`){
    let sEmbed = new Discord.RichEmbed()
    let sicon = message.guild.displayAvatarURL;
    
    .setDescription("Server Information")
    .setColor("#032359")
    .addField("Server Name", bot.user.username)
    .setThumbnail(sicon)
    .addField("Created On", bot.user.createdAt)
    .addField("Save Files");
    
    return message.channel.send(sEmbed);
  }
  
  if(cmd === `${prefix}botinfo`){
    let botEmbed = new Discord.RichEmbed()
    let bicon = bot.user.displayAvatarURL;
    
    .setDescription("Bot Information")
    .setColor("#003182")
    .addField("Bot Name", bot.user.username)
    .setThumbnail(bicon)
    .addField("Created On", bot.user.createdAt)
    .addField("Save Files");
    
    return message.channel.send(botEmbed);
  }
  
});

bot.login(token.token);
