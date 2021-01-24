const Discord = require("discord.js");

const client = new Discord.Client();

const config = require("./config.json");

client.on("ready", () => {
  console.log("Ładowanie...");
  console.log("Kalkulowanie..."); 
  console.log("Logowanie...");
  console.log("Zalogowano!"); 
  client.user.setActivity(`Sprawdzanie pracowników...`);
});

client.on("guildCreate", guild => {
  console.log(`Bot dodany: ${guild.name} (id: ${guild.id}). ${guild.memberCount} użytkowników na serwerze!`);
  client.user.setActivity(`Sprawdzanie pracowników...`);
});

client.on("guildDelete", guild => {
  console.log(`Bot usunięty: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Sprawdzanie pracowników...`);
});


client.on("message", async message => {

  
  if(message.author.bot) return;
  
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  
  if(command === "test") {
    const m = await message.channel.send("Kalkulowanie...");
    m.edit(`**WYNIKI**\n Ping: ${m.createdTimestamp - message.createdTimestamp}ms\n Ping bazy danych: ${Math.round(client.ping)}ms`);
  }
  
  if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }
  
  if(command === "czysc") {
    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 1 || deleteCount > 100)
      return message.reply("Wybierz liczbe od 1 do 100");
    
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Nie można wyczyścić wiadomości. \n Powód: ${error}`));
  }
  if(command === "duty") {
    message.channel.send("**ZAPRASZAM NA DUTY**\n Pub jest pusty, bądź jest mało pracowników, a dużo klientów.\n Lepiej by było jakby ktoś był na duty, nie zapomnijcie, że w każdą Niedziele są wystawiane premie.\n Lepiej dla was, i dla biznesu\n <@&780807558247219211> <@&780807496796602368> <@&780807436050628610>");
  }
  if(command === "pomoc") {
    message.channel.send("**Prefix**: ^\n**^duty**\n**^say**\n**^czysc**\n**^test**");
  }
});

client.login(config.token);