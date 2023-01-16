const {Client, GatewayIntentBits, Events} = require('discord.js');
const { ask } = require("./ai.js"); 

const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on(Events.MessageCreate, async message => {
    if (message.content.substring(0, 1) === "!") {
        const prompt = message.content.substring(1); //remove the exclamation mark from the message
        const answer = await ask(prompt); //prompt GPT-3
        client.channels.fetch(message.channelId).then(channel => channel.send(answer));
   }
 }
);

client.login(process.env.discord_bot_apikey);