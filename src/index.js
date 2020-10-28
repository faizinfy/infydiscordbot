const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', async msg => {
    var randomNumber = getRandomNumber();
    if (msg.guild.id == process.env.GUILD_ID && msg.channel.id == process.env.CHANNEL_ID){
        if (msg.content.toLowerCase() === '-roll'){
            await msg.reply(randomNumber);
        }
    }

    // await msg.channel.send('BOT is not running.');
});

function getRandomNumber(){
    return Math.floor(Math.random() * 100) + 0 
}


client.login(process.env.BOT_TOKEN);