const fetch = require('node-fetch');
// const speedTest = require('speedtest-net');
const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

var PORT = process.env.PORT || 5000;
var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

app.use(express.static('client'))

server.listen(PORT, function() {
    console.log('InfyBOT is running!');
});

client.once('ready', () => {
	console.log('Ready!');
});

let gifs = [];

client.on('message', async msg => {
    if (msg.guild.id == process.env.GUILD_ID && msg.channel.id == process.env.CHANNEL_ID){
        //Roll random number between 0 to 100
        var randomNumber = getRandomNumber();
        if (msg.content.toLowerCase() === '-roll'){
            await msg.reply(randomNumber);
        }

        //Get GIF image
        if (msg.content.includes('-g ')){
            gifs = [];

            var stext = msg.content.replace('-g ','');
            var fullurl = process.env.API_URL + stext;
            const response = await fetch(fullurl);
            const json = await response.json();

            gifs = json.data.map(gif => gif.images.fixed_height.url);
            var randomNo = Math.floor(Math.random() * 10) + 0 
            await msg.channel.send(gifs[randomNo]);
        }

        //Get lyric
        if (msg.content.includes('-a ')){
            var artistsong = msg.content.slice(msg.content.lastIndexOf('-a ') + 3);
            var split = artistsong.split(':');

            var fullurl2 = process.env.LYRIC_API_URL;
            const response = await fetch(fullurl2 + split[0] + '/' + split[1]);
            const json3 = await response.json();

            await msg.channel.send(json3.lyrics);
        }

        //Get super hero stat
        if (msg.content.includes('-hero ')){
            var htext = msg.content.replace('-hero ','');
            var fullurl3 = process.env.HERO_API_URL + htext;

            const response = await fetch(fullurl3);
            const json4 = await response.json();

            let intelligence = json4.results[0].powerstats.intelligence;
            let strength = json4.results[0].powerstats.strength;
            let speed = json4.results[0].powerstats.speed;
            let durability = json4.results[0].powerstats.durability;
            let power = json4.results[0].powerstats.power;
            let combat = json4.results[0].powerstats.combat;

            await msg.channel.send('Intelligence: ' + intelligence + '\nStrength: ' + strength + '\nSpeed: ' + speed + '\nDurability: ' + durability + '\nPower: ' + power + '\nCombat: ' + combat);
        }

        //Speedtest
        // if (msg.content.toLowerCase() === '-test'){
        //     await msg.reply("SpeedTest is in progress. Please wait...");
        //     try {
        //         const json2 = await speedTest({acceptLicense:true});
        //         await msg.reply((json2.download.bytes * 0.000001) + " Mbps");
        //     } catch (err) {
        //         await msg.reply(err.message);
        //     }
        // }
    }
});

function getRandomNumber(){
    return Math.floor(Math.random() * 100) + 0 
}


client.login(process.env.BOT_TOKEN);