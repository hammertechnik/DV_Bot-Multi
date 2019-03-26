const botconfig = require("./storage/botconfig.json");
const token = require("./storage/token.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

})
bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("DefiantVideos", {type: "WATCHING"});
  //bot.user.setGame("with DefiantVideos");
});

bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);


  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot, message, args);
  //   if(cmd === `${prefix}kick`){
  //
  //       //.tkick @Mewna Because
  //
  //       let kuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  //       if(!kuser) return message.channel.send("Can't find User!");
  //       let kreason = args.join(" ").slice(22);
  //       if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("You do not have the proper permissions!");
  //       if(kuser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can not kick this member!");
  //
  //       let kickEmbed = new Discord.RichEmbed()
  //       .setDescription("~Kick~")
  //       .setColor("#c18413")
  //       .addField("Kicked User", `${kuser} with ID: ${kuser.id}`)
  //       .addField("Kicked By", `<@${message.author.id}> with ID: ${message.author.id}`)
  //       .addField("Kicked In", message.channel)
  //       .addField("Time", message.createdAt)
  //       .addField("Reason", kreason);
  //
  //       let kickChannel = message.guild.channels.find(`name`, "logs");
  //       if(!kickChannel) return message.channel.send("Can't find Logs Channel!")
  //
  //       message.guild.member(kuser).kick(kreason);
  //
  //       kickChannel.send(kickEmbed);
  //
  //       return;
  //   }
  //
  //   if(cmd === `${prefix}ban`){
  //
  //       //.tkick @Mewna Because
  //
  //       let buser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  //       if(!buser) return message.channel.send("Can't find User!");
  //       let breason = args.join(" ").slice(22);
  //       if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have the proper permissions!");
  //       if(buser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You can not ban this member!");
  //
  //       let banEmbed = new Discord.RichEmbed()
  //       .setDescription("~Ban~")
  //       .setColor("#9b0000")
  //       .addField("Banned User", `${buser} with ID: ${buser.id}`)
  //       .addField("Banned By", `<@${message.author.id}> with ID: ${message.author.id}`)
  //       .addField("Banned In", message.channel)
  //       .addField("Time", message.createdAt)
  //       .addField("Reason", breason);
  //
  //       let banChannel = message.guild.channels.find(`name`, "logs");
  //       if(!banChannel) return message.channel.send("Can't find Logs Channel!")
  //
  //       message.guild.member(buser).ban(breason);
  //
  //       banChannel.send(banEmbed);
  //
  //       return;
  //   }
  //
  //
  //   if(cmd === `${prefix}report`){
  //
  //       let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  //       if(!rUser) return message.channel.send("Couldn't find user.");
  //       let reason = args.join(" ").slice(22);
  //
  //       let reportEmbed = new Discord.RichEmbed()
  //       .setDescription("Reports")
  //       .setColor("#003182")
  //       .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
  //       .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
  //       .addField("Channel", message.channel)
  //       .addField("Time", message.createdAt)
  //       .addField("Reason", reason);
  //
  //       let reportschannel = message.guild.channels.find(`name`, "reports");
  //       if(!reportschannel) return message.channel.send("Couldn't find reports channel.");
  //
  //       message.delete().catch(O_o=>{});
  //       reportschannel.send(reportEmbed);
  //
  //       return;
  //   }
  //
  // if(cmd === `${prefix}serverinfo`){
  //   let sicon = message.guild.iconURL;
  //   let sEmbed = new Discord.RichEmbed()
  //
  //   .setDescription("Server Information")
  //   .setColor("#032359")
  //   .addField("Server Name", message.guild.name)
  //   .setThumbnail(sicon)
  //   .addField("Created On", message.guild.createdAt)
  //   .addField("You Joined", message.member.joinedAt)
  //   .addField("Total Members", message.guild.memberCount)
  //   .addField("Save Files");
  //
  //   return message.channel.send(sEmbed);
  // }
  //
  // if(cmd === `${prefix}botinfo`){
  //   let bicon = bot.user.displayAvatarURL;
  //   let botEmbed = new Discord.RichEmbed()
  //
  //   .setDescription("Bot Information")
  //   .setColor("#003182")
  //   .addField("Bot Name", bot.user.username)
  //   .setThumbnail(bicon)
  //   .addField("Created On", bot.user.createdAt)
  //   .addField("Save Files");
  //
  //   return message.channel.send(botEmbed);
  // }

});

bot.login(token.token);
